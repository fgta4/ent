<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}



use \FGTA4\exceptions\WebException;
use \FGTA4\utils\SqlUtility;

/**
 * ent/location/site/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header site (mst_site)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 14/12/2022
 */
$API = new class extends siteBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\site_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new site_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			
			$criteriaValues = [
				"search" => " A.site_id LIKE CONCAT('%', :search, '%') OR A.site_name LIKE CONCAT('%', :search, '%') "
			];
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'buildListCriteriaValues')) {
					// ** buildListCriteriaValues(object &$options, array &$criteriaValues) : void
					//    apabila akan modifikasi parameter2 untuk query
					//    $criteriaValues['fieldname'] = " A.fieldname = :fieldname";  <-- menambahkan field pada where dan memberi parameter value
					//    $criteriaValues['fieldname'] = "--";                         <-- memberi parameter value tanpa menambahkan pada where
					//    $criteriaValues['fieldname'] = null                          <-- tidak memberi efek pada query secara langsung, parameter digunakan untuk keperluan lain 
					//
					//    untuk memberikan nilai default apabila paramter tidak dikirim
					//    // \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
					$hnd->buildListCriteriaValues($options, $criteriaValues);
				}
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'prepareListData')) {
					// ** prepareListData(object $options, array $criteriaValues) : void
					//    misalnya perlu mebuat temporary table,
					//    untuk membuat query komplex dapat dibuat disini	
					$hnd->prepareListData($options, $criteriaValues);
				}
			}


			/* Data Query Configuration */
			$sqlFieldList = [
				'site_id' => 'A.`site_id`', 'site_nameshort' => 'A.`site_nameshort`', 'site_name' => 'A.`site_name`', 'site_descr' => 'A.`site_descr`',
				'site_address' => 'A.`site_address`', 'site_phone' => 'A.`site_phone`', 'site_email' => 'A.`site_email`', 'site_sqmwide' => 'A.`site_sqmwide`',
				'site_isdisabled' => 'A.`site_isdisabled`', 'site_geoloc' => 'A.`site_geoloc`', 'site_opendate' => 'A.`site_opendate`', 'sitemodel_id' => 'A.`sitemodel_id`',
				'sitegroup_id' => 'A.`sitegroup_id`', 'land_id' => 'A.`land_id`', 'dept_id' => 'A.`dept_id`', 'config_id' => 'A.`config_id`',
				'taxtype_id' => 'A.`taxtype_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_site A";
			$sqlWhere = $where->sql;
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
					// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
					//    menambah atau memodifikasi field-field yang akan ditampilkan
					//    apabila akan memodifikasi join table
					//    apabila akan memodifikasi nilai parameter
					$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
				}
			}

			// filter select column
			$columsSelected = $sqlFieldList;
			if (!property_exists($options, 'selectFields')) {
				$options->selectFields = [];
			}
			if (is_array($options->selectFields)) {
				if (count($options->selectFields)>0) {
					$columsSelected = [];
					foreach ($options->selectFields as $fieldname) {
						if (array_key_exists($fieldname, $sqlFieldList)) {
							$columsSelected[$fieldname] = $sqlFieldList[$fieldname];
						}
					}
				}
			}
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($columsSelected);



			/* Sort Configuration */
			if (!property_exists($options, 'sortData')) {
				$options->sortData = [];
			}
			if (!is_array($options->sortData)) {
				$options->sortData = [];
			}
		


			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'sortListOrder')) {
					// ** sortListOrder(array &$sortData) : void
					//    jika ada keperluan mengurutkan data
					//    $sortData['fieldname'] = 'ASC/DESC';
					$hnd->sortListOrder($options->sortData);
				}
			}
			$sqlOrders = \FGTA4\utils\SqlUtility::generateSqlSelectSort($options->sortData);


			/* Compose SQL Query */
			$sqlCount = "select count(*) as n from $sqlFromTable $sqlWhere";
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
				$sqlOrders 
				$sqlLimit
			";

			/* Execute Query: Count */
			$stmt = $this->db->prepare($sqlCount );
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			/* Execute Query: Retrieve Data */
			$stmt = $this->db->prepare($sqlData);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);


			/* Proces result */
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}



				/*
				$record = array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'sitemodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['sitemodel_id'], $this->db, 'mst_sitemodel', 'sitemodel_id', 'sitemodel_name'),
					'sitegroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['sitegroup_id'], $this->db, 'mst_sitegroup', 'sitegroup_id', 'sitegroup_name'),
					'land_name' => \FGTA4\utils\SqlUtility::Lookup($record['land_id'], $this->db, 'mst_land', 'land_id', 'land_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'config_name' => \FGTA4\utils\SqlUtility::Lookup($record['config_id'], $this->db, 'mst_config', 'config_id', 'config_name'),
					'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				]);
				*/
				
				$this->addFields('sitemodel_name', 'sitemodel_id', $record, 'mst_sitemodel', 'sitemodel_name', 'sitemodel_id');
				$this->addFields('sitegroup_name', 'sitegroup_id', $record, 'mst_sitegroup', 'sitegroup_name', 'sitegroup_id');


				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						// ** DataListLooping(array &$record) : void
						//    apabila akan menambahkan field di record
						$hnd->DataListLooping($record);
					}
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListFinal')) {
					// ** DataListFinal(array &$records) : void
					//    finalisasi data list
					$hnd->DataListFinal($records);
				}
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	// function addFields(string $columnname, string $checkcolum, array &$record,  string $tablename, string $namefield, string $idfield) {
	// 	if (array_key_exists($checkcolum, $record)) {
	// 		$value = SqlUtility::Lookup($record[$checkcolum], $this->db, $tablename, $idfield, $namefield);
	// 		$record[$columnname] = $value;
	// 	}
	// }



};