class HomeController < ApplicationController

  def index
    #@area = Area.new
    @featured = Story.first_three_featured

    #require 'debugger'; debugger
    @alerts_count = Alert.ammount_in_the_last_year
  end

end
