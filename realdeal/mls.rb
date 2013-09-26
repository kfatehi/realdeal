#!/usr/bin/env ruby
a=ARGV[0]
if not a or a.size == 0
  raise StandardError, "Give me an address, in quotes"
end

require 'bundler'
Bundler.require
provider = Polterheist::TheMLS.new

if result = provider.locate_property(a)
  doc = Nokogiri::HTML.parse(result)
  puts doc.css(".mainSection").to_html
  exit(0)
end

exit(-1)
