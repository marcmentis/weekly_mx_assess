# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ForSelect.find_or_initialize_by_value('0001').update_attributes(facility: '9999', code: 'facility', value: '0001', text: 'GBHC', option_order: 1, grouper: '')
ForSelect.find_or_initialize_by_value('0002').update_attributes(facility: '9999', code: 'facility', value: '0002', text: 'Kingsboro', option_order: 2, grouper: '')
ForSelect.find_or_initialize_by_value('0003').update_attributes(facility: '9999', code: 'facility', value: '0003', text: 'Buffalo', option_order: 3, grouper: '')
ForSelect.find_or_initialize_by_value('0005').update_attributes(facility: '9999', code: 'facility', value: '0005', text: 'CPC', option_order: 4, grouper: '')
ForSelect.find_or_initialize_by_value('0010').update_attributes(facility: '9999', code: 'facility', value: '0010', text: 'Manhattan', option_order: 5, grouper: '')
ForSelect.find_or_initialize_by_value('0012').update_attributes(facility: '9999', code: 'facility', value: '0012', text: 'Middletown', option_order: 6, grouper: '')
ForSelect.find_or_initialize_by_value('0013').update_attributes(facility: '9999', code: 'facility', value: '0013', text: 'Pilgrim', option_order: 7, grouper: '')
ForSelect.find_or_initialize_by_value('0014').update_attributes(facility: '9999', code: 'facility', value: '0014', text: 'NYPI', option_order: 8, grouper: '')
ForSelect.find_or_initialize_by_value('0015').update_attributes(facility: '9999', code: 'facility', value: '0015', text: 'Rochester', option_order: 9, grouper: '')
ForSelect.find_or_initialize_by_value('0016').update_attributes(facility: '9999', code: 'facility', value: '0016', text: 'Rockland', option_order: 10, grouper: '')
ForSelect.find_or_initialize_by_value('0017').update_attributes(facility: '9999', code: 'facility', value: '0017', text: 'SLPC', option_order: 11, grouper: '')
ForSelect.find_or_initialize_by_value('0018').update_attributes(facility: '9999', code: 'facility', value: '0018', text: 'HPC', option_order: 12, grouper: '')
ForSelect.find_or_initialize_by_value('0021').update_attributes(facility: '9999', code: 'facility', value: '0021', text: 'Bronx', option_order: 13, grouper: '')
ForSelect.find_or_initialize_by_value('0024').update_attributes(facility: '9999', code: 'facility', value: '0024', text: 'CDPC', option_order: 14, grouper: '')
ForSelect.find_or_initialize_by_value('0025').update_attributes(facility: '9999', code: 'facility', value: '0025', text: 'SCPC', option_order: 15, grouper: '')
ForSelect.find_or_initialize_by_value('0026').update_attributes(facility: '9999', code: 'facility', value: '0026', text: 'RCPC', option_order: 16, grouper: '')
ForSelect.find_or_initialize_by_value('0035').update_attributes(facility: '9999', code: 'facility', value: '0035', text: 'EPC', option_order: 17, grouper: '')
ForSelect.find_or_initialize_by_value('0036').update_attributes(facility: '9999', code: 'facility', value: '0036', text: 'SBPC', option_order: 18, grouper: '')
ForSelect.find_or_initialize_by_value('0037').update_attributes(facility: '9999', code: 'facility', value: '0037', text: 'WNYPC', option_order: 19, grouper: '')
ForSelect.find_or_initialize_by_value('0038').update_attributes(facility: '9999', code: 'facility', value: '0038', text: 'MHPC', option_order: 20, grouper: '')
ForSelect.find_or_initialize_by_value('0042').update_attributes(facility: '9999', code: 'facility', value: '0042', text: 'NKI', option_order: 21, grouper: '')
ForSelect.find_or_initialize_by_value('0043').update_attributes(facility: '9999', code: 'facility', value: '0043', text: 'CNYPC', option_order: 22, grouper: '')
ForSelect.find_or_initialize_by_value('0044').update_attributes(facility: '9999', code: 'facility', value: '0044', text: 'Kirby', option_order: 23, grouper: '')
ForSelect.find_or_initialize_by_value('0045').update_attributes(facility: '9999', code: 'facility', value: '0045', text: 'MVPC', option_order: 24, grouper: '')
ForSelect.find_or_initialize_by_value('0048').update_attributes(facility: '9999', code: 'facility', value: '0048', text: 'NYCCC', option_order: 25, grouper: '')
ForSelect.find_or_initialize_by_value('9999').update_attributes(facility: '9999', code: 'facility', value: '9999', text: 'All', option_order: 26, grouper: '')

# Pilgrim Ward Names
ForSelect.find_or_initialize_by_value('81/101').update_attributes(facility: '0013', code: 'ward', value: '81/101', text: '81/101', option_order: 1, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/102').update_attributes(facility: '0013', code: 'ward', value: '81/102', text: '81/102', option_order: 2, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/201').update_attributes(facility: '0013', code: 'ward', value: '81/201', text: '81/201', option_order: 3, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/202').update_attributes(facility: '0013', code: 'ward', value: '81/202', text: '81/202', option_order: 4, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/301').update_attributes(facility: '0013', code: 'ward', value: '81/301', text: '81/301', option_order: 5, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/302').update_attributes(facility: '0013', code: 'ward', value: '81/302', text: '81/302', option_order: 6, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/401').update_attributes(facility: '0013', code: 'ward', value: '81/401', text: '81/401', option_order: 7, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/402').update_attributes(facility: '0013', code: 'ward', value: '81/402', text: '81/402', option_order: 8, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/501').update_attributes(facility: '0013', code: 'ward', value: '81/501', text: '81/501', option_order: 9, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/502').update_attributes(facility: '0013', code: 'ward', value: '81/502', text: '81/502', option_order: 10, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/601').update_attributes(facility: '0013', code: 'ward', value: '81/601', text: '81/601', option_order: 11, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('81/602').update_attributes(facility: '0013', code: 'ward', value: '81/602', text: '81/602', option_order: 12, grouper: 'bld81')
ForSelect.find_or_initialize_by_value('82/203').update_attributes(facility: '0013', code: 'ward', value: '82/203', text: '82/203', option_order: 13, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/204').update_attributes(facility: '0013', code: 'ward', value: '82/204', text: '82/204', option_order: 14, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/303').update_attributes(facility: '0013', code: 'ward', value: '82/303', text: '82/303', option_order: 15, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/304').update_attributes(facility: '0013', code: 'ward', value: '82/304', text: '82/304', option_order: 16, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/403').update_attributes(facility: '0013', code: 'ward', value: '82/403', text: '82/403', option_order: 17, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/404').update_attributes(facility: '0013', code: 'ward', value: '82/404', text: '82/404', option_order: 18, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/503').update_attributes(facility: '0013', code: 'ward', value: '82/503', text: '82/503', option_order: 19, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/504').update_attributes(facility: '0013', code: 'ward', value: '82/504', text: '82/504', option_order: 20, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('82/604').update_attributes(facility: '0013', code: 'ward', value: '82/604', text: '82/604', option_order: 21, grouper: 'bld82')
ForSelect.find_or_initialize_by_value('25/2N').update_attributes(facility: '0013', code: 'ward', value: '25/2N', text: '25/2N', option_order: 22, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/2S').update_attributes(facility: '0013', code: 'ward', value: '25/2S', text: '25/2S', option_order: 23, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/3N').update_attributes(facility: '0013', code: 'ward', value: '25/3N', text: '25/3N', option_order: 24, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/3S').update_attributes(facility: '0013', code: 'ward', value: '25/3S', text: '25/3S', option_order: 25, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/4N').update_attributes(facility: '0013', code: 'ward', value: '25/4N', text: '25/4N', option_order: 26, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/4S').update_attributes(facility: '0013', code: 'ward', value: '25/4S', text: '25/4S', option_order: 27, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/5N').update_attributes(facility: '0013', code: 'ward', value: '25/5N', text: '25/5N', option_order: 28, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('25/5S').update_attributes(facility: '0013', code: 'ward', value: '25/5S', text: '25/5S', option_order: 29, grouper: 'bld25')
ForSelect.find_or_initialize_by_value('d/c').update_attributes(facility: '0013', code: 'ward', value: 'd/c', text: 'd/c', option_order: 30, grouper: 'd/c')

# Sagamore Ward Names
ForSelect.find_or_initialize_by_value('E-unit').update_attributes(facility: '0025', code: 'ward', value: 'E-unit', text: 'E-unit', option_order: 1, grouper: 'scpc')
ForSelect.find_or_initialize_by_value('F-unit').update_attributes(facility: '0025', code: 'ward', value: 'F-unit', text: 'F-unit', option_order: 2, grouper: 'scpc')
ForSelect.find_or_initialize_by_value('G-unit').update_attributes(facility: '0025', code: 'ward', value: 'G-unit', text: 'G-unit', option_order: 3, grouper: 'scpc')


# User make sure pgmdmjm in database
User.find_or_initialize_by_authen('pgmdmjm').update_attributes(firstname: 'Marc', lastname: 'Mentis', authen: 'pgmdmjm', facility: '0013', email: 'marc.mentis@omh.ny.gov', firstinitial: 'M', middleinitial: 'J')
User.find_or_initialize_by_authen('mmentis').update_attributes(firstname: 'Marc', lastname: 'Mentis', authen: 'mmentis', facility: '0013', email: 'marc.mentis@omh.ny.gov', firstinitial: 'M', middleinitial: 'J')

# Bio-Psycho-Social Mx Assessment
ForSelect.find_or_initialize_by_value('0-8Weeks').update_attributes(facility: '9999', code: 'DrugsChanged', value: '0-8Weeks', text: '0-8Weeks', option_order: 1, grouper: '')
ForSelect.find_or_initialize_by_value('Gt8Weeks').update_attributes(facility: '9999', code: 'DrugsChanged', value: 'Gt8Weeks', text: 'Gt8Weeks', option_order: 2, grouper: '')
ForSelect.find_or_initialize_by_value('0-3Months').update_attributes(facility: '9999', code: 'GroupsChanged', value: '0-3Months', text: '0-3Months', option_order: 1, grouper: '')
ForSelect.find_or_initialize_by_value('Gt3Months').update_attributes(facility: '9999', code: 'GroupsChanged', value: 'Gt3Months', text: 'Gt3Months', option_order: 2, grouper: '')


