import assert from 'assert';
import { calculateLayout, generatePages } from '../src/utils/layoutCalculator.ts';

console.log('--- RUNNING PNP MASTER LAYOUT & DUPLEX TESTS ---');

// Test 1: Standard A4 portrait layout with 9 mini cards or poker cards
const layoutA4 = calculateLayout(
  210, // paperWidth
  297, // paperHeight
  'portrait',
  { top: 10, bottom: 10, left: 10, right: 10 },
  63.5, // Poker width
  88.9, // Poker height
  0, // Spacing X
  0, // Spacing Y
  18 // 18 cards
);

console.log(`A4 Poker Layout: ${layoutA4.cols} cols x ${layoutA4.rows} rows = ${layoutA4.cardsPerPage} cards/page`);
assert(layoutA4.cols >= 2, 'Should fit at least 2 poker columns on A4 portrait');
assert(layoutA4.rows >= 3, 'Should fit at least 3 poker rows on A4 portrait');

// Test 2: Symmetric Grid Centering for flawless front-to-back physical printing
const totalGridW = layoutA4.cols * layoutA4.cardWidthMm;
const rightMargin = layoutA4.paperWidthMm - (layoutA4.gridStartX + totalGridW);
const marginDiff = Math.abs(layoutA4.gridStartX - rightMargin);
console.log(`Grid centering check: Left margin = ${layoutA4.gridStartX.toFixed(2)}mm, Right margin = ${rightMargin.toFixed(2)}mm (Diff: ${marginDiff.toFixed(4)}mm)`);
assert(marginDiff < 0.001, 'Grid MUST be symmetrically centered on paper for duplex alignment!');

// Test 3: Duplex Mirroring check
const dummyCards = Array.from({ length: 6 }, (_, i) => ({
  id: `c-${i}`,
  name: `Card ${i}`,
  frontImage: 'data:front',
  backImage: 'data:back',
  copies: 1,
}));

const pages = generatePages(dummyCards, layoutA4, 'long-edge');
assert(pages.length >= 2, 'Should generate at least 1 front and 1 back page');
const frontPage = pages[0];
const backPage = pages[1];

assert.strictEqual(frontPage.isBackPage, false, 'Page 0 must be front');
assert.strictEqual(backPage.isBackPage, true, 'Page 1 must be back');

// Check that Card 0 (front col 0) has its back on col (cols - 1)
const frontCard0 = frontPage.cards.find(c => c.instanceIndex === 0);
const backCard0 = backPage.cards.find(c => c.instanceIndex === 0);

assert(frontCard0, 'Front card 0 must exist');
assert(backCard0, 'Back card 0 must exist');
console.log(`Front Card 0: Col ${frontCard0.col}, Row ${frontCard0.row}`);
console.log(`Back Card 0:  Col ${backCard0.col}, Row ${backCard0.row}`);

assert.strictEqual(backCard0.col, layoutA4.cols - 1 - frontCard0.col, 'Back card col MUST be mirrored!');
assert.strictEqual(backCard0.row, frontCard0.row, 'In long-edge flip, row must stay identical!');

console.log('✅ ALL LAYOUT & DUPLEX TESTS PASSED SUCCESSFULLY!');
