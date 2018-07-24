require "json"
require "io/console"

if ENV['VSPHERE_PASSWORD'].nil?
  print "Enter VSPHERE_PASS: "
  password = STDIN.noecho(&:gets).chomp
  ENV['VSPHERE_PASS'] = password
end

def vm_metadata
  {
    created_by_user: ENV['VSPHERE_USER'].to_s,
    created_at: Time.now.to_s,
  }.to_json
end

Vagrant.configure(2) do |config|
  config.vm.define "swarm-manager" do |node|
    node.vm.hostname = "swarm-node-manager"
    node.vm.provider :vsphere do |vsphere, override|
      override.vm.box = # Enter box name for a valid linux-based VM
      override.vm.box_url = # Enter valid URL to catalog file for box name
      override.vm.synced_folder '.', '/vagrant'
      vsphere.memory_mb = 8192
      vsphere.cpu_count = 2
      vsphere.ip_address_timeout = 360
      vsphere.user = ENV['VSPHERE_USER'].to_s
      vsphere.password = ENV['VSPHERE_PASS'].to_s
      # The following vsphere configuration settings are set by the user
      vsphere.host = ""
      vsphere.compute_resource_pool_name = ""
      vsphere.template_name = ""
    end
    node.vm.provision :docker
    node.vm.provision :docker_compose
  end

  (1..2).each do |vm|
    config.vm.define "swarm-node-#{vm}" do |node|
      node.vm.hostname = "swarm-node-#{vm}"
      node.vm.provider :vsphere do |vsphere, override|
        vsphere.memory_mb = 8192
        vsphere.cpu_count = 2
        vsphere.ip_address_timeout = 360
        vsphere.user = ENV['VSPHERE_USER'].to_s
        vsphere.password = Base64.decode(ENV['VSPHERE_PASSWORD'].to_s)
        # The following vsphere configuration settings are set by the user
        vsphere.host = ""
        vsphere.compute_resource_pool_name = ""
        vsphere.template_name = ""
        override.vm.box = ""
        override.vm.box_url = ""
      end
      node.vm.provision :docker
    end
  end

end