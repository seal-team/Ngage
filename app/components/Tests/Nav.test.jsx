import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import { Nav } from '../Nav'

/* global describe it beforeEach */
/* global describe it beforeEach */
describe('<Nav />', () => {
  let nav
  describe('should have an empty state', () => {
    beforeEach('clears Timeline', () => {
      nav = shallow(< Nav />)
    })
    it('should show that slides and selectSlide to be default', () => {
 
      expect(nav.state().showModal).to.equal(false)
    })
  })
  describe('should change state upon click', () => {
    beforeEach('sets a user for the profile', () => {
      nav = shallow(<Nav user={'george'} />)
    })
    it('should changle showModal state', () => {
      const NewPresentationButton = nav.find('button').at(0)

      NewPresentationButton.simulate('click')
      expect(nav.state().showModal).to.equal(true)
      NewPresentationButton.simulate('click')
      expect(nav.state().showModal).to.equal(false)
    })
  })
  
})

