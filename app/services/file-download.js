import Service, { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default Service.extend({
  session: service(),

  getHeaders: function() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.id_token}`;
    }

    return headers;
  },

  addPath: function (baseUrl, path) {
    if (!path) return baseUrl;

    let url = new URL(baseUrl, location.href);

    let [pathname, search] = path.split('?', 2);
    url.pathname += `/${pathname}`;

    if (search) {
      new URLSearchParams(search).forEach((value, name) => {
        url.searchParams.append(name, value);
      });
    }

    return url.href;
  },

  downloadFile: async function(record, path, fileName, fileType, data) {
    let modelClass = record.constructor;
    let modelName = modelClass.modelName;
    let snapshot = record._createSnapshot();
    let adapter = record.store.adapterFor(modelName);
    let baseUrl = adapter.buildURL(modelName, record.id, snapshot, 'updateRecord');
    let headers = this.getHeaders();
    let url = this.addPath(baseUrl, path);
    if (data)
      url += `?${Object.keys(data).map(k=>`${k}=${data[k]}`).join('&')}`;
    let config = {
      headers: headers,
    };
    let response = await fetch(url, config)
    if (!fileType)
      fileType='text/plain';
    if (fileType == 'text/plain')
      response = await response.text();
    else
      response = await response.blob();
    const blob = new Blob([response], { type: fileType });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  }

})
