import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next, vote} from '../src/core'

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

	describe('vote', () => {
		it('creates a tally for new vote', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later')
				}),
				entries: List()
			})
			const nextState = vote(state, 'Transpotting')
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 1
					})
				}),
				entries: List()
			}))
		})

		it('adds vote to tally', ()=>{
			const state = Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 10,
						'28 Days Later': 3,
					})
				}),
				entries: List()
			})
			const nextState = vote(state, 'Transpotting')
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 11,
						'28 Days Later': 3,
					})
				}),
				entries: List()
			}))
		})
	})
})