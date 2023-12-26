import {expect} from 'chai';
import {Block} from "./Block";

describe('Block', () => {
    it('should create a new Block', () => {
        const block = new Block({}, 'div')
        expect(block).to.be.an.instanceof(Block)
    })

    it('should compare the results of getContent() and _element', () => {
        const block = new Block({}, 'div')
        expect(block.getContent()).to.equal(block.element)
    })

    it('should call componentDidUpdate after changing the props', () => {
        const block = new Block({text: 'text'})
        block.setProps({text: 'new_text'})
        expect(block.componentDidUpdate).to.have.been
    })

    it('checks if _makePropsProxy changes props', () => {
        const block = new Block({ id: '123' }, 'div');
        block._props.id = '435'
        expect(block.getContent().outerHTML).equal('<div id="123"></div>');
    });

})
