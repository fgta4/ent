<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * ent/items/itemclass/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemclass (mst_itemclass)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/08/2024
 */
$API = new class extends itemclassBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'mst_itemclass';
		$primarykey = 'itemclass_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemclass_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new itemclass_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');

			$obj->itemclass_name = strtoupper($obj->itemclass_name);
			$obj->itemmodel_id = strtoupper($obj->itemmodel_id);






			// current user & timestamp	
			if ($datastate=='NEW') {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				if (method_exists(get_class($hnd), 'PreCheckInsert')) {
					// PreCheckInsert($data, &$obj, &$options)
					$hnd->PreCheckInsert($data, $obj, $options);
				}
			} else {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");	
		
				if (method_exists(get_class($hnd), 'PreCheckUpdate')) {
					// PreCheckUpdate($data, &$obj, &$key, &$options)
					$hnd->PreCheckUpdate($data, $obj, $key, $options);
				}
			}

			//handle data sebelum sebelum save
			if (method_exists(get_class($hnd), 'DataSaving')) {
				// ** DataSaving(object &$obj, object &$key)
				$hnd->DataSaving($obj, $key);
			}

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId($hnd, $obj);
					}
					
					// handle data sebelum pada saat pembuatan SQL Insert
					if (method_exists(get_class($hnd), 'RowInserting')) {
						// ** RowInserting(object &$obj)
						$hnd->RowInserting($obj);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';

					// handle data sebelum pada saat pembuatan SQL Update
					if (method_exists(get_class($hnd), 'RowUpdating')) {
						// ** RowUpdating(object &$obj, object &$key))
						$hnd->RowUpdating($obj, $key);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"itemclass_id" => $obj->itemclass_id
				];

				$criteriaValues = [
					"itemclass_id" => " itemclass_id = :itemclass_id "
				];
				if (method_exists(get_class($hnd), 'buildOpenCriteriaValues')) {
					// buildOpenCriteriaValues(object $options, array &$criteriaValues) : void
					$hnd->buildOpenCriteriaValues($options, $criteriaValues);
				}

				$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
				$result = new \stdClass; 
	
				if (method_exists(get_class($hnd), 'prepareOpenData')) {
					// prepareOpenData(object $options, $criteriaValues) : void
					$hnd->prepareOpenData($options, $criteriaValues);
				}

				$sqlFieldList = [
					'itemclass_id' => 'A.`itemclass_id`', 'itemclass_name' => 'A.`itemclass_name`', 'itemclass_isdisabled' => 'A.`itemclass_isdisabled`', 'itemclass_isadvproces' => 'A.`itemclass_isadvproces`',
					'itemclass_descr' => 'A.`itemclass_descr`', 'itemclassgroup_id' => 'A.`itemclassgroup_id`', 'owner_unit_id' => 'A.`owner_unit_id`', 'unitmeasurement_id' => 'A.`unitmeasurement_id`',
					'cob_id' => 'A.`cob_id`', 'cost_coa_id' => 'A.`cost_coa_id`', 'itemmodel_id' => 'A.`itemmodel_id`', 'itemmanage_id' => 'A.`itemmanage_id`',
					'owner_dept_id' => 'A.`owner_dept_id`', 'maintainer_dept_id' => 'A.`maintainer_dept_id`', 'depremodel_id' => 'A.`depremodel_id`', 'itemclass_minassetvalue' => 'A.`itemclass_minassetvalue`',
					'asset_coa_id' => 'A.`asset_coa_id`', 'depre_coa_id' => 'A.`depre_coa_id`', 'itemclass_depreage' => 'A.`itemclass_depreage`', 'itemclass_depreresidu' => 'A.`itemclass_depreresidu`',
					'itemclass_isallowoverqty' => 'A.`itemclass_isallowoverqty`', 'itemclass_isallowoverdays' => 'A.`itemclass_isallowoverdays`', 'itemclass_isallowovertask' => 'A.`itemclass_isallowovertask`', 'itemclass_isallowovervalue' => 'A.`itemclass_isallowovervalue`',
					'itemclass_isallowunbudget' => 'A.`itemclass_isallowunbudget`', 'itemclass_isindependentsetting' => 'A.`itemclass_isindependentsetting`', 'itemmodel_isintangible' => 'A.`itemmodel_isintangible`', 'itemmodel_issellable' => 'A.`itemmodel_issellable`',
					'itemmodel_isnonitem' => 'A.`itemmodel_isnonitem`', 'itemmodel_ishasmainteinerdept' => 'A.`itemmodel_ishasmainteinerdept`', 'itemmanage_isasset' => 'A.`itemmanage_isasset`', 'depremodel_isautocalc' => 'A.`depremodel_isautocalc`',
					'itemmanage_isbyassetowner' => 'A.`itemmanage_isbyassetowner`', 'itemmanage_isbystockowner' => 'A.`itemmanage_isbystockowner`', 'itemmanage_isbynonitemowner' => 'A.`itemmanage_isbynonitemowner`', 'itemmanage_isbypartnerselect' => 'A.`itemmanage_isbypartnerselect`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_itemclass A";
				$sqlWhere = $where->sql;
					
				if (method_exists(get_class($hnd), 'SqlQueryOpenBuilder')) {
					// SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
					$hnd->SqlQueryOpenBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
				}
				$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);
	
			
				$sqlData = "
					select 
					$sqlFields 
					from 
					$sqlFromTable 
					$sqlWhere 
				";
	
				$stmt = $this->db->prepare($sqlData);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
	
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$dataresponse = array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'itemclassgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclassgroup_id'], $this->db, 'mst_itemclassgroup', 'itemclassgroup_id', 'itemclassgroup_name'),
					'owner_unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'unitmeasurement_name' => \FGTA4\utils\SqlUtility::Lookup($record['unitmeasurement_id'], $this->db, 'mst_unitmeasurement', 'unitmeasurement_id', 'unitmeasurement_name'),
					'cob_name' => \FGTA4\utils\SqlUtility::Lookup($record['cob_id'], $this->db, 'mst_cob', 'cob_id', 'cob_name'),
					'cost_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['cost_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'itemmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmodel_id'], $this->db, 'mst_itemmodel', 'itemmodel_id', 'itemmodel_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'maintainer_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['maintainer_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'depremodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['depremodel_id'], $this->db, 'mst_depremodel', 'depremodel_id', 'depremodel_name'),
					'asset_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['asset_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'depre_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['depre_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}

				$result->username = $userdata->username;
				$result->dataresponse = (object) $dataresponse;
				if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
					// DataSavedSuccess(object &$result) : void
					$hnd->DataSavedSuccess($result);
				}

				$this->db->commit();
				return $result;

			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId(object $hnd, object $obj) : string {
		// dipanggil hanya saat $autoid == true;

		$id = null;
		$handled = false;
		if (method_exists(get_class($hnd), 'CreateNewId')) {
			// CreateNewId(object $obj) : string 
			$id = $hnd->CreateNewId($obj);
			$handled = true;
		}

		if (!$handled) {
			$id = uniqid();
		}

		return $id;
	}

};