'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Bank",
	autoid: false,

	persistent: {
		'mst_bank' : {
			primarykeys: ['bank_id'],
			comment: 'Daftar Brand',
			data: {
				bank_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				bank_name: {text:'Bank', type: dbtype.varchar(60), null:false, uppercase: true},
				bank_code: {text:'Code', type: dbtype.varchar(30), null:true, suppresslist:true},
				country_id: {
					text:'Country', type: dbtype.varchar(10), null:false, suppresslist:true,
					options: {required:true},
					comp: comp.Combo({
						table: 'mst_country', 
						field_value: 'country_id', field_display: 'country_name', 
						api: 'ent/location/country/list'})					
				},				
				bank_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},

			},

			defaultsearch: ['bank_id', 'bank_name'],

			uniques: {
				'bank_name' : ['bank_name']
			}
		},
	},

	schema: {
		title: 'Bank',
		header: 'mst_bank',
		detils: {}
	}
}



