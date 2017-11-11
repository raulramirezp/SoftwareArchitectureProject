require 'nokogiri'
require 'savon'
require 'resolv-replace'

class WebserviceController < ApplicationController
  soap_service namespace: 'urn:WashOutWS', camelize_wsdl: :lower

  soap_action "check_operation",
              :args   => { :userId => :integer, :category => :string },
              :return => :json
  def check_operation
    puts("ingreso a la funcion, intento de conectar con savon")
    #client = Savon.client(wsdl: "http://0.0.0.0:9080/OperationESBService/OperationESBPort?wsdl")
    #client = Savon.client(wsdl: "http://127.0.0.1:9080/OperationESBService/OperationESBPort?wsdl")
    #client = Savon.client(wsdl: "http://192.168.1.8:9080/newWSDLService/newWSDLPort?wsdl")
    client = Savon.client(wsdl: "http://192.168.1.4:9080/BESService/BESPort?wsdl")
    puts("pasa conexion con savon, intento a reconocer las operaciones")
    client.operations #[:operation_esb_operation]
    puts("pasa operaciones, intento de hacer llamado al metodo")
    puts(params[:userId])
    puts(params[:category])
    response = client.call(:bes_operation, message: {userId: params[:userId], category: params[:category]})
    puts("pasa llamado, intento retornar respuesta")
    puts(response.body.to_s)
    render :json => response.body
  end
end
