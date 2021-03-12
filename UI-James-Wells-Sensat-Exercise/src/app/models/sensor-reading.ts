export interface SensorReading {

  id: string; // UUID for this sensor reading
  box_id: string; // UUID of the box
  sensor_type: string; // type of the sensor
  name: string; // type of data read by sensor
  range_l: number; // measuring range lower bound
  range_u: number; // measuring range upper bound
  longitude: number; // location of the box (lon)
  latitude: number; // location of the box (lat)
  reading: number; // actual value being read
  unit: string; // measurement unit
  reading_ts: string; // "2019-09-10T00:00:00"; when the reading was taken
}
