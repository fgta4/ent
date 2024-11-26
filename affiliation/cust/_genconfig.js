'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Customer",
	autoid: true,

	persistent: {
		'mst_cust' : {
			primarykeys: ['cust_id'],
			comment: 'Daftar Customer',
			data: {
				cust_id: {text:'ID', type: dbtype.varchar(14), null:false},
				cust_name: {text:'Name', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Name harus diisi'}},
				cust_phone: {text:'Default Phone', type: dbtype.varchar(60), null:true},
				cust_email: {text:'Default Email', type: dbtype.varchar(60), null:true},
				cust_password: {text:'Password', type: dbtype.varchar(60), null:true},
				cust_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				gender_id: {
					text:'Gender', type: dbtype.varchar(1), null:true, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Gender harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_gender', 
						field_value: 'gender_id', field_display: 'gender_name', 
						api: 'ent/general/gender/list'
					})				
				},
				cust_ishasbirthinfo: {
					text:'Has Birth Information', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'},
				},
				cust_birthdate: {text:'Birth Date', type: dbtype.date, null:true, suppresslist: true, options:{required:true,invalidMessage:'Tanggal lahir harus diisi'}},
				cust_isrecvoffer: {caption:'Offer', text:'Allow Receive Offer', type: dbtype.boolean, null:false, default:'1', suppresslist: true, options: {labelWidth:'300px'}},
				cust_reasonrejectoffer: {text:'Reject Reason', type: dbtype.varchar(255), null:true, suppresslist: true},
			},
			defaultsearch : ['cust_id', 'cust_name'],
			uniques: {
				'cust_phone' : ['cust_phone'],
				'cust_email' : ['cust_email'],
			}
		},

		'mst_custaccess' : {
			primarykeys: ['custaccess_id'],
			comment: 'Daftar Kontak Customer untuk keperluan access, login, atau kontak (no HP, email)',
			data: {
				custaccess_id: {text:'ID', type: dbtype.varchar(14), null:false},
				custaccesstype_id: {text:'AccessType', type: dbtype.varchar(10), null:true},
				custaccess_code: {text:'Code', type: dbtype.varchar(60), null:true},
				custaccess_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				cust_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden:true},
			},
			uniques: {
				'custaccess_code' : ['custaccess_code']
			}
		},

		'mst_custsession' : {
			primarykeys: ['custsession_id'],
			comment: 'Daftar session login customer',
			data: {
				custsession_id: {text:'ID', type: dbtype.varchar(32), null:false},   // 364adb35817a783f9cee5477674a5d03
				custsession_expired: {text:'AccessType', type: dbtype.date, null:true},
				cust_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden:true},
			}
		},


		'mst_custwalinkreq' : {
			primarykeys: ['custwalinkreq_id'],
			comment: 'Daftar Contact Customer',
			data: {
				custwalinkreq_id: {text:'ID', type: dbtype.varchar(32), null:false},
				ref: {text:'Ref', type: dbtype.varchar(32)},
				intent: {text:'Intent', type: dbtype.varchar(128), null:false},
				room_id: {text:'Room', type: dbtype.varchar(32), null:false},
				message: {text:'Message', type: dbtype.varchar(1024), null:false},
				voubatch_id: {text:'VouBatch', type: dbtype.varchar(32)},
				vou_id: {text:'Voucher', type: dbtype.varchar(32)},
				crmevent_id: {text:'Event', type: dbtype.varchar(32)},
				code: {text:'Code', type: dbtype.varchar(32)},
				slpart: {text:'SL part', type: dbtype.varchar(32)},
				data: {text:'Data', type: dbtype.varchar(2048)},
				result: {text:'Result', type: dbtype.varchar(2048)},
				status: {text:'Status', type: dbtype.varchar(3)},
				custwa_id: {text:'Customer', type: dbtype.varchar(14), null:false, hidden: true},
				cust_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden:true},
			}
		}
	},

	schema: {
		title: 'Customer',
		header: 'mst_cust',
		detils: {
			'access' : {
				title: 'Access', table:'mst_custaccess', form: true, headerview:'cust_name', 
				editorHandler: true, listHandler: true
			},
			'linkreq' : {
				title: 'Link Request', table:'mst_custwalinkreq', form: true, headerview:'custwa_name', 
				editorHandler: true, listHandler: true
			},

		}
	}
}
