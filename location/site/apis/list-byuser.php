<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'isdisabled', '0');

			$options->criteria->empl_id = $userdata->employee_id;
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.site_id LIKE CONCAT('%', :search, '%') OR A.site_name LIKE CONCAT('%', :search, '%') ",
					"isdisabled" => " A.site_isdisabled = :isdisabled ",
					"empl_id" => " B.empl_id = :empl_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_site A inner join view_usersite B ON A.site_id = B.site_id " . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
						A.site_id, A.site_name, A.site_address, A.site_phone, A.site_email, A.site_sqmwide
						, A.site_isdisabled, A.site_geoloc, A.site_opendate, A.sitemodel_id, A.sitegroup_id
						, A.land_id, A.dept_id
						, A._createby, A._createdate, A._modifyby, A._modifydate 
					from mst_site A
						inner join view_usersite B ON A.site_id = B.site_id
				" 
				. $where->sql 
				. " ORDER BY A.site_name " 
				. $limit
			);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					 'sitemodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['sitemodel_id'], $this->db, 'mst_sitemodel', 'sitemodel_id', 'sitemodel_name'),
					 'sitegroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['sitegroup_id'], $this->db, 'mst_sitegroup', 'sitegroup_id', 'sitegroup_name'),
					 'land_name' => \FGTA4\utils\SqlUtility::Lookup($record['land_id'], $this->db, 'mst_land', 'land_id', 'land_name'),
					 'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					  
				]));
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

}

$API = new DataList();