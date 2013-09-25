#!/usr/bin/env ruby
require 'bundler'
Bundler.setup
require 'capybara/poltergeist'
require 'pry'
require 'launchy'
require 'fileutils'
Capybara.javascript_driver = :poltergeist
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
    inspector:true,
    phantomjs_logger: Tempfile.new('quiet_phantomjs'),
    js_errors:false
  })
end
Capybara.current_driver = :poltergeist

def ss
  path = '/tmp/screenshot.png'
  FileUtils.rm(path) if File.exists?(path)
  page.save_screenshot path
  Launchy.open path
end

module PoltergeistDriver
  class TheMLS
    include Capybara::DSL

    Capybara.app_host = "http://guests.themls.com"

    def locate_property(address)
      visit('/Listings.aspx')
      # fill_in "txtSearchBox", :with => address
      binding.pry
      #all(:xpath, "//li[@class='g']/h3/a").each { |a| puts a[:href] }

    end
  end
end

spider = PoltergeistDriver::TheMLS.new

address = "12249 THELMA St"

spider.locate_property address
