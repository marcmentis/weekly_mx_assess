module PhiAuditing
	def accessauditlog_entry(action_cd)
      aurora1 = Accessauditlog.create(access_dt: DateTime.now, 
                                    action_cd: action_cd, 
                                    facility_stamp: request.headers['HTTP_OMHFACILITYNUM'],
                                    ip_addr: request.headers['HTTP_X_FORWARDED_FOR'],
                                    workstation_id: request.headers['HTTP_X_FORWARDED_FOR'],
                                    auth_method: 'T')
    end
end