import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
	updateUserRecord: ['data'],
},{
	prefix: 'MAIN_'
})

module.exports = { Types, Creators }