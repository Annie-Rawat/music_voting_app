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
	});

	describe('next', ()=>{
		it('takes the next 2 entries under vote', ()=>{
			const state = Map({
				entries: List.of('Transpotting', '28 Days Later', 'Sunshine')
			})
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}))

		})

		it('puts back winner into the list of entries', ()=>{
			const state = Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 10,
						'28 Days Later': 3,
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			})
			const nextState = next(state)
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions'),
				}),
				entries: List.of('127 Hours', 'Transpotting')
			}))
		})

		it('puts both back into entries in case of a tie', ()=>{
			const state = Map({
				vote: Map({
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 3,
						'28 Days Later': 3,
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
			})
			const nextState = next(state)
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions'),
				}),
				entries: List.of('127 Hours', 'Transpotting', '28 Days Later')
			}))	
		})

		it('finds final winner when only 2 entries are left', ()=>{
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
			const nextState = next(state, 'Transpotting')
			expect(nextState).to.equal(Map({
				winner: 'Transpotting'
			}))
		})
		
	});

	describe('vote', () => {
		it('creates a tally for new vote', () => {
			const state = Map({
					pair: List.of('Transpotting', '28 Days Later')
			})
			const nextState = vote(state, 'Transpotting')
			expect(nextState).to.equal(Map({
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 1
					})
				
			}))
		})

		it('adds vote to tally', ()=>{
			const state = Map({
				
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 10,
						'28 Days Later': 3,
					})
			})
			const nextState = vote(state, 'Transpotting')
			expect(nextState).to.equal(Map({
			
					pair: List.of('Transpotting', '28 Days Later'),
					tally: Map({
						'Transpotting': 11,
						'28 Days Later': 3,
					})
			}))
		})
	});
})