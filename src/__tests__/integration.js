import { onCombo, onComboNode } from '../index';

function dispatchKeys(...keys) {
    const keydown = keys
        // Map the keys to an event
        .map(options => new KeyboardEvent('keydown', options));

    const keyup = keys
        // Map the keys to an event
        .map(options => new KeyboardEvent('keyup', options));

    // Loop over them and dispatch an keydown
    keydown.forEach(event => {
        window.dispatchEvent(event);
    });

    // And then keyup
    keyup.forEach(event => {
        window.dispatchEvent(event);
    });
}

describe("integration", () => {
    describe("onCombo", () => {
        it('happy case', () => {
            const handler = jest.fn();

            // Listen to a combo
            onCombo('a+b', handler);

            // Dispatch the combo
            dispatchKeys({ key: 'a' }, { key: 'b' }, { key: 'c' });

            // Assert the handler being called one time
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('sad case', () => {
            const handler = jest.fn();

            // Listen to a combo
            onCombo('a+c', handler);

            // Dispatch the combo
            dispatchKeys({ key: 'a' }, { key: 'b' }, { key: 'c' });

            // Assert the handler being called one time
            expect(handler).toHaveBeenCalledTimes(0);
        });
    });

    xdescribe("onComboNode", () => {
        it('happy case', () => {
            const handler = jest.fn();
            const target = document.createElement('div');
            const node = document.createElement('div');

            // Listen to a combo
            onComboNode('a+b', target, handler);

            // Dispatch the combo
            dispatchKeys({ key: 'a', target }, { key: 'b', target });

            // Assert the handler being called zero times since
            // the node is not focused
            expect(handler).toHaveBeenCalledTimes(0);

            // Call the focus on the target
            target.focus();

            // Dispatch the combo
            dispatchKeys({ key: 'a', target }, { key: 'b', target });

            // Assert the handler being called one times
            expect(handler).toHaveBeenCalledTimes(1);
        });
    });
});