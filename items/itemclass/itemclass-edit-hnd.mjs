let	form, obj, opt;


export function init(param) {
	form = param.form;
	obj = param.obj;
	opt = param.opt;

	obj.chk_itemmanage_isasset.checkbox({ onChange: (checked) => { chk_itemmanage_isasset_changed(checked) }});
	
	obj.chk_itemmodel_ishasmainteinerdept.checkbox({ onChange: (checked) => { chk_itemmodel_ishasmainteinerdept_changed(checked) }});
	obj.chk_depremodel_isautocalc.checkbox({ onChange: (checked) => { chk_depremodel_isautocalc_changed(checked) }});
	obj.chk_itemclass_isindependentsetting.checkbox({ onChange: (checked) => { chk_itemclass_isindependentsetting_changed(checked) }});

}


export function form_newdata(data, options) {
	options.OnNewData = () => {
		chk_itemmodel_ishasmainteinerdept_changed();
		chk_itemmanage_isasset_changed();
		chk_depremodel_isautocalc_changed();
		chk_itemclass_isindependentsetting_changed();
	}
}



export function form_dataopened(result, options) {
	chk_itemmodel_ishasmainteinerdept_changed();
	chk_itemmanage_isasset_changed();
	chk_depremodel_isautocalc_changed();
	chk_itemclass_isindependentsetting_changed();
}


export function cbo_itemmodel_id_selected(value, display, record, args) {
	console.log(record);

	var itemmodel_ismultidept = record.itemmodel_ismultidept;

	// itemclass setting
	form.setValue(obj.chk_itemmodel_isintangible, form.toBool(record.itemmodel_isintangible ));	
	form.setValue(obj.chk_itemmodel_issellable, form.toBool(record.itemmodel_issellable ));	
	form.setValue(obj.chk_itemmodel_isnonitem, form.toBool(record.itemmodel_isnonitem ));	
	form.setValue(obj.chk_itemmodel_ishasmainteinerdept, form.toBool(record.itemmodel_ishasmainteinerdept ));	
	form.setValue(obj.chk_itemmanage_isasset, form.toBool(record.itemmanage_isasset ));	

	form.setValue(obj.chk_itemmanage_isbyassetowner, form.toBool(record.itemmanage_isbyassetowner ));	
	form.setValue(obj.chk_itemmanage_isbystockowner, form.toBool(record.itemmanage_isbystockowner ));	
	form.setValue(obj.chk_itemmanage_isbynonitemowner, form.toBool(record.itemmanage_isbynonitemowner ));	
	form.setValue(obj.chk_itemmanage_isbypartnerselect, form.toBool(record.itemmanage_isbypartnerselect ));	

	form.setValue(obj.cbo_itemmanage_id, record.itemmanage_id, record.itemmanage_name);

	if (itemmodel_ismultidept) {
		obj.cbo_owner_dept_id.reset();
		obj.cbo_maintainer_dept_id.reset();
	} else {
		form.setValue(obj.cbo_owner_dept_id, record.dept_id, record.dept_name);
		form.setValue(obj.cbo_maintainer_dept_id, record.dept_id, record.dept_name);
	}
	
	
	chk_itemmodel_ishasmainteinerdept_changed();
	chk_itemmanage_isasset_changed();
}

export function cbo_itemmanage_id_selected(value, display, record, args) {
	form.setValue(obj.chk_itemmanage_isbyassetowner, form.toBool(record.itemmanage_isbyassetowner ));	
	form.setValue(obj.chk_itemmanage_isbystockowner, form.toBool(record.itemmanage_isbystockowner ));	
	form.setValue(obj.chk_itemmanage_isbynonitemowner, form.toBool(record.itemmanage_isbynonitemowner ));	
	form.setValue(obj.chk_itemmanage_isbypartnerselect, form.toBool(record.itemmanage_isbypartnerselect ));	
	form.setValue(obj.chk_itemmanage_isasset, form.toBool(record.itemmanage_isasset ));	

	
	chk_itemmodel_ishasmainteinerdept_changed();
	chk_itemmanage_isasset_changed();
}

export function cbo_owner_dept_id_dataloading(criteria, options) {
	// criteria.dept_isitemowner = 1;
	var isbyassetowner_checked = form.getValue(obj.chk_itemmanage_isbyassetowner);
	var isbystockowner_checked = form.getValue(obj.chk_itemmanage_isbystockowner);
	var isbynonitemowner_checked = form.getValue(obj.chk_itemmanage_isbynonitemowner);
	var isbypartnerselect_checked = form.getValue(obj.chk_itemmanage_isbypartnerselect);
	
	if (isbyassetowner_checked) {
		criteria.dept_isassetowner = 1;
	}

	if (isbystockowner_checked) {
		criteria.dept_isstockowner = 1;
	}

	if (isbynonitemowner_checked) {
		criteria.dept_isnonitemowner = 1;
	}

	if (isbypartnerselect_checked) {
		criteria.dept_ispartnerselect = 1;
	}

}

export function cbo_maintainer_dept_id_dataloading(criteria, options) {
	criteria.dept_isitemaintainer = 1;
}

export function cbo_depremodel_id_selected(value, display, record, args) {
	form.setValue(obj.chk_depremodel_isautocalc, form.toBool(record.depremodel_isautocalc ));
	chk_depremodel_isautocalc_changed();
}




export function form_dataopening(result, options) {
	if (result.record.cbo_maintainer_dept_id==null) { result.record.cbo_maintainer_dept_id='--NULL--'; result.record.cbo_maintainer_dept_name='NONE'; }
}



function chk_itemmanage_isasset_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_itemmanage_isasset);
	}

	if (checked) {
		// depresiasi wajib diisi
		var promptMandatory = form.getDefaultPrompt(true)
		obj.cbo_depremodel_id.revalidate(form.mandatoryValidation(obj.cbo_depremodel_id.name, 'Model Depresiasi harus diisi'));
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_depremodel_id, promptMandatory.value, promptMandatory.text);
		}
	} else {
		// depresiasi tidak wajib diisi
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_depremodel_id.revalidate(form.optionalValidation());
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_depremodel_id, promptOptional.value, promptOptional.text);
		}
	}

}

function chk_itemmodel_ishasmainteinerdept_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_itemmodel_ishasmainteinerdept);
	}

	if (checked) {
		var promptMandatory = form.getDefaultPrompt(true)
		obj.cbo_maintainer_dept_id.revalidate(form.mandatoryValidation(obj.cbo_maintainer_dept_id.name, 'Dept maintainer harus diisi'));
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_maintainer_dept_id, promptMandatory.value, promptMandatory.text);
		}
	} else {
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_maintainer_dept_id.revalidate(form.optionalValidation());
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_maintainer_dept_id, promptOptional.value, promptOptional.text);
		}
	}
}

function  chk_depremodel_isautocalc_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_depremodel_isautocalc);
	}

	// tampilkan field depresiasi
	var deprefields = document.querySelectorAll('.assetpanel');
	for (var el of deprefields) {
		if (checked) {
			el.classList.remove('assetpanel-hide');
		} else {
			el.classList.add('assetpanel-hide');
		}
	}
}

function chk_itemclass_isindependentsetting_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_itemclass_isindependentsetting);
	}


	var disabled = checked ? false : true;
	form.setDisable(obj.chk_itemmodel_isintangible, disabled);
	form.setDisable(obj.chk_itemmodel_issellable, disabled);
	form.setDisable(obj.chk_itemmodel_isnonitem, disabled);
	form.setDisable(obj.chk_itemmodel_ishasmainteinerdept, disabled);
	form.setDisable(obj.chk_itemmanage_isasset, disabled);
	form.setDisable(obj.chk_depremodel_isautocalc, disabled);
}

