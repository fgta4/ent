'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

// onDataLoadingHandler: true,
// onDataLoadedHandler: true,
// onSelectingHandler: true,
// onSelectedHandler: true


module.exports = {
	title: "Partner",
	autoid: true,

	persistent: {
		'mst_partner' : {
			primarykeys: ['partner_id'],
			comment: 'Daftar Partner (rekanan)',
			data: {
				partner_id: {text:'ID', type: dbtype.varchar(14), null:false},

				partnertype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, 
					options:{required:true,invalidMessage:'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnertype', 
						field_value: 'partnertype_id', field_display: 'partnertype_name', 
						api: 'ent/affiliation/partnertype/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					
					})					
				
				},	

				empl_id: {
					class: 'employee',
					text:'Employee Name', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/master/empl/list',
						onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},

				partnertype_isempl: {
					class: 'employee',
					text:'Link To Employee', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {disabled: true, labelWidth: '300px'}},	
				partnertype_isdefname: {
					class: 'employee',
					text:'Define Custom Name', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth: '300px'}},	

				partner_name: {
					id: 'pnl_edit-partner_name',
					uppercase: true,
					text:'Name', type: dbtype.varchar(60), null:false, options:{required:true,invalidMessage:'Name harus diisi'}},
				

				partner_addressline1: {
					id: "pnl_edit-partner_addressline1",
					text:'Address', type: dbtype.varchar(100), null:false, suppresslist: true,  options:{required:true,invalidMessage:'Alamat harus diisi'}},
				partner_addressline2: {
					id: "pnl_edit-partner_addressline2",
					text:'&nbsp;', type: dbtype.varchar(100), null:false, suppresslist: true},
				partner_addressline3: {
					id: "pnl_edit-partner_addressline3",
					text:'&nbsp;', type: dbtype.varchar(100), null:false, suppresslist: true},
				
				
					partner_city: {text:'City', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'City harus diisi'}},
				partner_postcode: {text:'Post Code', type: dbtype.varchar(10), null:false, suppresslist: true},

				partner_country: {
					text:'Country', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Country harus diisi'},
					comp: comp.Combo({
						table: 'mst_country', 
						field_value: 'country_id', field_display: 'country_name', 
						api: 'ent/general/country/list'})					
				},
				partner_phone: {text:'Phone', type: dbtype.varchar(30), null:false,  suppresslist: true, options:{required:true,invalidMessage:'Phone harus diisi'},},	
				partner_mobilephone: {text:'HP', type: dbtype.varchar(30), null:false,  suppresslist: true},
				partner_email: {text:'Email', type: dbtype.varchar(150), null:false, lowercase: true, suppresslist: true},				
				partner_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				partner_isparent: {text:'Parent', type: dbtype.boolean, null:false, default:'0', suppresslist: true},

				partner_parent: {
					text: 'Parent', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_partner',
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'partner_parent_name',
						field_mappings : [
							`{mapping: 'partner_id', text: 'ID'}`,
							`{mapping: 'partner_name', text: 'partner_name', hidden: true}`,
							`{mapping: 'partner_parent_name', text: 'Name', style:'width:200px'}`
						],
						api: 'ent/affiliation/partner/list-parent',

					})
				},


				partnerorg_id: {
					text:'Org', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Org harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnerorg', 
						field_value: 'partnerorg_id', field_display: 'partnerorg_name', 
						api: 'ent/affiliation/partnerorg/list'})					
				},

				partner_npwp: {text:'NPWP', type: dbtype.varchar(30), null:false,  suppresslist: true},
				partner_isnonnpwp: {text:'Non NPWP', type: dbtype.boolean, null:false, default:'0', suppresslist: true},

				


				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'ae_empl_name',
						api: 'hrms/master/empl/list'})
				}	,

				col_empl_id: {
					text:'Collector', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',   field_display_name: 'col_empl_name',
						api: 'hrms/master/empl/list'})
				}					
			},

			defaultsearch : ['partner_id', 'partner_name'],

			uniques: {
				'partner_name' : ['partner_name']
			}
		},


		'mst_partnerastype' : {
			primarykeys: ['partnerastype_id'],
			comment: 'Daftar Type lain yang dimiliki partner',
			data: {
				partnerastype_id: {text:'ID', type: dbtype.varchar(14), null:false},
				partnertype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, 
					options:{required:true,invalidMessage:'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnertype', 
						field_value: 'partnertype_id', field_display: 'partnertype_name', 
						api: 'ent/affiliation/partnertype/list'})					
				
				},
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},
			uniques: {
				'partnerastype_pair' : ['partner_id', 'partnertype_id']
			}			
		},		


		'mst_partnerbank' : {
			primarykeys: ['partnerbank_id'],
			comment: 'Daftar Bank yang dimiliki suatu Partner (rekanan)',
			data: {
				partnerbank_id: {text:'ID', type: dbtype.varchar(14), null:false},
				partnerbank_accnum: {text:'Account Number', type: dbtype.varchar(30), null:false, uppercase: true},
				partnerbank_accname: {text:'Account Name', type: dbtype.varchar(90), null:false, uppercase: true},
				partnerbank_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				bank_id: {
					text:'Bank', type: dbtype.varchar(14), null:false, uppercase: true,
					options:{required:true,invalidMessage:'Bank harus diisi'},
					comp: comp.Combo({
						table: 'mst_bank', 
						field_value: 'bank_id', field_display: 'bank_name', 
						api: 'ent/general/bank/list'})
			
				},
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},
			uniques: {
				'partnerbank_accnum' : ['partner_id', 'partnerbank_accnum']
			}			
		},

		'mst_partnercontact' : {
			primarykeys: ['partnercontact_id'],
			comment: 'Daftar kontak yang dimiliki suatu Partner (rekanan)',
			data: {
				partnercontact_id: {text:'ID', type: dbtype.varchar(14), null:false},
				partnercontact_name: {text:'Name', type: dbtype.varchar(100), null:false, uppercase: true, options:{required:true,invalidMessage:'Name harus diisi'}},
				partnercontact_position: {text:'Position', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Position harus diisi'}},
				partnercontact_mobilephone: {text:'HP', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'HP harus diisi'}},
				partnercontact_email: {text:'Email', type: dbtype.varchar(150), null:false, lowercase: true, options:{required:true,validType: ['email'],invalidMessage:'Email harus diisi'}},
				partnecontact_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0', options:{labelWidth:'300px'}},
				partnecontact_iscontract: {text:'PIC - Contract', type: dbtype.boolean, null:false, default:'0', options:{labelWidth:'300px'}},
				partnecontact_isinvoice: {text:'PIC - Invoice', type: dbtype.boolean, null:false, default:'0', options:{labelWidth:'300px'}},
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},
			uniques: {
				'partnercontact_mobilephone' : ['partner_id', 'partnercontact_mobilephone']
			}			
		},


		'mst_partnersite' : {
			primarykeys: ['partnersite_id'],
			comment: 'Daftar partner yang bisa diakses dari site tertentu',
			data: {				
				partnersite_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				site_id: {
					text:'Site', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},			
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},

			uniques: {
				'partnersite_pair' : ['partner_id', 'site_id']
			}	

		},

		'mst_partnertrxmodel' : {
			comment: 'Model transaksi yang bisa dilayani partner',
			primarykeys: ['partnertrxmodel_id'],
			data: {
				partnertrxmodel_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				trxmodel_id: { 
					text: 'Transaksi', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true,invalidMessage:'Account harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name',  field_display_name: 'coa_name',
						api: 'finact/master/coa/list'})
				},

				unbill_coa_id: {
					text:'Account (unbill)', type: dbtype.varchar(20), null:false,  suppresslist: true,
					options:{required:true,invalidMessage:'Account Unbill harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'unbill_coa_name',
						api: 'finact/master/coa/list'})
				},

				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},

			uniques: {
				'partnertrxmodel_pair': ['partner_id', 'trxmodel_id']
			},

		},

		'mst_partnerref' : {
			comment: 'Kode referensi partner untuk keperluan interfacing dengan system lain',
			primarykeys: ['partnerref_id'],		
			data: {
				partnerref_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				interface_id: { 
					text: 'Interface', type: dbtype.varchar(7), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Interface harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_interface', 
						field_value: 'interface_id', field_display: 'interface_name', field_display_name: 'interface_name', 
						api: 'ent/general/interface/list'})				
				
				},
				partnerref_name: {text:'Name', type: dbtype.varchar(30), null:false},	
				partnerref_code: {text:'Code', type: dbtype.varchar(30), null:false, uppercase: true},			
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},
			uniques: {
				'partnerref_pair': ['partner_id', 'interface_id']
			},			
		},

		'mst_partnerprop' : {
			primarykeys: ['partnerprop_id'],
			comment: 'Daftar Properties Partner',
			data: {
				partnerprop_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},	
				partnerprop_key: {text:'Key', type: dbtype.varchar(90), null:false, uppercase: true},	
				partnerprop_value: {text:'Value', type: dbtype.varchar(255), null:false, options: {required:true,invalidMessage:'Value harus diisi'}},	
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false},
			},
			uniques: {
				partnerprop_key: ['partner_id', 'partnerprop_key']
			}
		},	
	},

	schema: {
		title: 'Partner',
		header: 'mst_partner',
		detils: {
			'type' : {title: 'Type', table:'mst_partnerastype', form: true, headerview:'partner_name', editorHandler: true, listHandler: true},
			'bank' : {title: 'Bank', table:'mst_partnerbank', form: true, headerview:'partner_name', editorHandler: true, listHandler: true},
			'contact' : {title: 'Contact', table:'mst_partnercontact', form: true, headerview:'partner_name', editorHandler: true, listHandler: true},
			'site' : {title: 'Site', table:'mst_partnersite', form: true, headerview:'partner_name', editorHandler: true, listHandler: true},
			'modeltransaksi': {title: 'Model Transaksi', table: 'mst_partnertrxmodel', form: true, headerview: 'partner_name', editorHandler: true, listHandler: true },
			'ref': {title: 'Referensi', table: 'mst_partnerref', form: true, headerview: 'partner_name', editorHandler: true, listHandler: true },
			'prop': {title: 'Properties', table: 'mst_partnerprop', form: true, headerview: 'partner_name', editorHandler: true, listHandler: true },
		}

	}
}
