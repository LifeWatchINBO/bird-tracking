-- SQL to show number of records recorded earlier than tracking_started_at timestamp.
-- Those records should be removed.

select
  count(*)
from
bird_tracking_new_data as t
left join bird_tracking_devices as d
on t.device_info_serial = d.device_info_serial
where
  t.date_time < d.tracking_started_at
