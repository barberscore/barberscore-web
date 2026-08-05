import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

const SCORE_FIELDS = 'input.big-num:not([disabled]):not([readonly])';

// A spreadsheet paste arrives as tab/newline delimited cells.
function pastedCells(event) {
  const text = event?.clipboardData?.getData('text') ?? '';
  return text
    .split(/[\t\r\n]+/)
    .map((v) => v.trim())
    .filter(Boolean);
}

export default Component.extend({
  store: service(),
  sortedPanelists: [],
  init: function() {
    this._super(...arguments);
    this.setPanelists();
  },
  // Spread a pasted column/grid of scores across the score fields, table order.
  cascadePaste: action(function (event) {
    const startEl = event.target;
    if (!startEl.classList?.contains('big-num')) return;

    const cells = pastedCells(event);
    if (cells.length < 2) return;

    // Multi-cell text never belongs in a single field, whatever we do next.
    event.preventDefault();

    const table = startEl.closest('table');
    const fields = table ? [...table.querySelectorAll(SCORE_FIELDS)] : [];
    const start = fields.indexOf(startEl);

    // Only fill when every cell is a number and the counts line up exactly.
    if (start < 0 || fields.length - start !== cells.length) return;
    if (!cells.every((v) => Number.isFinite(Number(v)))) return;

    cells.forEach((value, i) => {
      const el = fields[start + i];
      el.value = value;
      // Keeps each panelist-score autosave in the loop.
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }),
  setPanelists: function() {
    const that = this;
    this.get('model.round.panelists').then(function (panelists) {
      const filteredPanelists = panelists.filter((panelist) => panelist.isScoring);
      filteredPanelists.sort(function(a, b) {
        return a.num < b.num ? -1 : 1;
      });
      that.set('sortedPanelists', filteredPanelists);
    });
  },
  isDisabled: computed('model.round.status', function() {
    if (this.get('model.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  sortedPanelistsProperties: [
    'kindSort',
    'categorySort',
    'num',
  ],
});
