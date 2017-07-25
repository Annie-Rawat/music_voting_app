import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next} from '../src/core'

describe('application logic', ()=>{
	describe('setEntries', ()=>{
		it('converts to immutable', ()=>{
			const state = new Map();
			const entries = ['Transpotting', '28 Days Later'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				'entries': List.of('Transpotting', '28 Days Later')
			}))
		})
	})

	describe('next', ()=>{
		it('takes the next 2 entries under vote', ()=>{
			const state = Map({
				entries: List.of('Transpotting', '28 Days Later', 'Sunshine')
			})
			const nextState = next(state);
			expect(nextState).to.equal(Map{
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			})

		})
	})
})