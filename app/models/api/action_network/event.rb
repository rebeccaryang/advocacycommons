module Api::ActionNetwork::Event
  extend Api::ActionNetwork::Export

  def self.export!(event, group, save_if_error=true)
    event_id = event.identifier_id('action_network')
    export_uri = "https://actionnetwork.org/api/v2/events"
    export_single_resource(event, group, export_uri, save_if_error)
  end

  def self.representer_class
    Api::ActionNetwork::Export::EventRepresenter
  end

  def self.resource
    'event'
  end
end
