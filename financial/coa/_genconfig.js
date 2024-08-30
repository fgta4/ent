'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA",
	autoid: false,

	persistent: {
		'mst_coa': {
			comment: 'Daftar COA akunting',
			primarykeys: ['coa_id'],
			data: {
				coa_id: { text: 'ID', type: dbtype.varchar(17), uppercase: false, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				coagroup_id: {
					text: 'Group', type: dbtype.varchar(17), null: false, uppercase: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Group COA harus diisi' },
					comp: comp.Combo({
						table: 'mst_coagroup',
						field_value: 'coagroup_id',
						field_display: 'coagroup_name',
						api: 'ent/financial/coagroup/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				coa_name: { text: 'Nama COA', type: dbtype.varchar(255), uppercase: false, options: { required: true, invalidMessage: 'Nama COA harus diisi' } },
				coa_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(255), uppercase: false, options: { required: true, invalidMessage: 'Nama Pendek harus diisi' } },
				coa_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },

				curr_id: {
					text: 'Currency', type: dbtype.varchar(10), null: true, uppercase: false, suppresslist: true,
					//options: { required: true, invalidMessage: 'Currency harus diisi' },
					options: { prompt:'NONE'},
					tips: 'apabila diisi, transaksi akan menggunakan currency ini, jika tidak bisa multi currency',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_curr',
						field_value: 'curr_id',
						field_display: 'curr_name',
						api: 'ent/financial/curr/list'
					})
				},	

				coamodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, uppercase: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model COA harus diisi', disabled: false },
					comp: comp.Combo({
						table: 'mst_coamodel',
						field_value: 'coamodel_id',
						field_display: 'coamodel_name',
						api: 'ent/financial/coamodel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				coareport_id: {
					text: 'Report', type: dbtype.varchar(10), null: false, uppercase: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Report COA harus diisi' },
					comp: comp.Combo({
						table: 'mst_coareport',
						field_value: 'coareport_id',
						field_display: 'coareport_name',
						api: 'ent/financial/coareport/list'
					})
				},

				coa_dk: { 
					text: 'D/K', type: dbtype.varchar(1), suppresslist: true, null: false, 
					tips: 'Saldo Normal (D: Debet, K: Kredit) ',
					tipstype: 'visble',	
					options: { required: true, invalidMessage: 'D/K harus diisi 1 / -1' }, 
				},
				coa_mp: { 
					text: 'Faktor Pengali', type: dbtype.int(1), suppresslist: true, null: false, default: 1, 
					options: { required: true, invalidMessage: 'Faktor Pengali harus diisi 1 / -1' }, 
				},
								

				coa_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				

				

			},

			defaultsearch: ['coa_id', 'coa_name'],
		
			uniques: {
				'coa_name': ['coa_name']
			}
		}	
	},

	schema: {
		header: 'mst_coa',
		detils: {
		}
	}
}