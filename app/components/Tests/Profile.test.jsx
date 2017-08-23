import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import { Profile } from '../Profile'

/* global describe it beforeEach */
/* global describe it beforeEach */
describe('<Profile />', () => {
  let profile
  describe('should have an empty state', () => {
    beforeEach('clears Profile', () => {
      profile = shallow(< Profile />)
    })
    it('shows that state is empty in all aspects', () => {

      profile.setState({ uid: 'foo', presentationID: 'dafdfou' })
      expect(profile.state().uid).to.equal('foo')
    })
    it('should have only have a div for whoami before user is stated', () => {

      expect(profile.find('.whoami')).to.have.length(1)
      expect(profile.find('.columns')).to.have.length(0)
    })
    it('should show different divs after user is stated', () => {
      const profileWithProps = shallow(<Profile user={'george'} />)

      expect(profileWithProps.find('.whoami')).to.have.length(1)
      expect(profileWithProps.find('.columns')).to.have.length(1)
    })
  })

  describe('should change state upon click', () => {
    beforeEach('sets a user for the profile', () => {
      profile = shallow(<Profile user={'george'} />)
    })
    it('should changle showModal state', () => {
      const NewPresentationButton = profile.find('a').at(0)

      NewPresentationButton.simulate('click')
      expect(profile.state().showModal).to.equal(true)
      NewPresentationButton.simulate('click')
      expect(profile.state().showModal).to.equal(false)
    })
  })
  describe('tests methods in profile', () => {
    beforeEach('sets a user for the profile', () => {
      profile = shallow(<Profile user={'george'} history=""/>)
    })
    it('should set state of presentationID and showDeleteModal', () => {

      profile.instance().handleDeleteModal(2)
      expect(profile.state().showDeleteModal).to.equal(true)
      expect(profile.state().presentationID).to.equal(2)
    })
  })
})


//   it('should return a history prop with given action and id', () => {

//     profile.instance().handleLink('edit', 2)
//     expect(profile.instance().props).to.equal('/edit/2/slide/')
//   })