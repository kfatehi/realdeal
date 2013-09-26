#!/usr/bin/env ruby
require 'bundler'
Bundler.require

provider = Polterheist::TheMLS.new

if result = provider.locate_property(ARGV[0])
  doc = Nokogiri::HTML.parse(result)
  puts doc.css(".mainSection").to_html
  exit(0)
end

exit(-1)
