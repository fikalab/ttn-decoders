// TTN decoder function for the RisingHF RHF1S001 temperature and humidity sensor
// http://www.risinghf.com/product/rhf1s001/?lang=en

function Decoder(bytes, port) {
  var decoded = {};
  if (bytes.length == 9) {
    decoded.temperature = (bytes[1] + bytes[2] * 256) * (175.72 / 65536) - 46.85; // degrees Celsius
    decoded.humidity = bytes[3] * (125 / 256) - 6; // percentage
    decoded.period = (bytes[4] + bytes[5] * 256) * 2; // seconds
    decoded.rssi = bytes[6] - 180; // dBm
    decoded.snr = (bytes[7] < 128) ? (bytes[7] / 4) : ((bytes[7] - 256) / 4); // dB
    decoded.battery = (bytes[8] + 150) / 100; // Volts
  }
  return decoded;
}

