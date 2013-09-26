#!/usr/bin/env ruby
a=ARGV[0]
if not a or a.size == 0
  raise StandardError, "Give me an address, in quotes"
end

require 'bundler'
Bundler.require
service = Polterheist::TheMLS.new

if listing = service.locate_property(a)
  doc = Nokogiri::HTML.parse(listing)
  main = doc.css('.mainSection').to_s
  mls_number = main.match(/MLS:\<\/label\>([A-z0-9]+)\<\/info/)[1] rescue nil
  beds = main.match(/Beds:\<\/label\>([A-z.0-9]+)\<\/info/)[1] rescue nil
  baths = main.match(/Beds:\<\/label\>([A-z.0-9]+)\<\/info/)[1] rescue nil
  sqft = main.match(/Sq Ft:\<\/label\>([A-z.,0-9]+)\<\/info/)[1] rescue nil
  data = {
    address: a,
    mls_number: mls_number,
    price: doc.css("span.price").text,
    beds: beds,
    baths: baths,
    sqft: sqft,
  }
  puts data.to_json
  exit(0)
end

exit(-1)
