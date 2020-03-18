# disable windows snmp service  by Power Shell

	open services.msc 
	stop snmp 服务 
	stop snmp 陷阱	


we can use powershell to check if it is present on the system, if it is, we can also use powershell script to uninstall it.

1. check if it is present:

		Get-WindowsCapability  -Online -Name "SNMP*"

 2. Then to install it run:

		Remove-WindowsCapability  -Online -Name "SNMP.Client~~~~0.0.1.0"	


# graphql session


Getting session in resolvers using graphql and apollo-server

https://stackoverflow.com/questions/59141113/getting-session-in-resolvers-using-graphql-and-apollo-server

How to update session from within a graphql resolver using apollo-server-epxress


https://stackoverflow.com/questions/46501706/how-to-update-session-from-within-a-graphql-resolver-using-apollo-server-epxress



# 20200305

[HPM] Error occurred while trying to proxy request  to  (ETIMEDOUT) (https://nodejs.org/api/errors.html#errors_common_system_errors)

https://github.com/chimurai/http-proxy-middleware/issues/171


## create mysql user 

CREATE USER 'reco'@'localhost' IDENTIFIED BY 'rita';
GRANT ALL PRIVILEGES ON *.* TO 'reco'@'localhost';
create database foo;

# tbit

内部多种网络管理平台，虚拟机集合，来自徐总 https://10.10.1.205/ui/#/host/vms    

# 居然找到了一堆Huawei的MIB

https://github.com/librenms/librenms/blob/master/mibs/huawei/HUAWEI-DEVICE-MIB

检索词 huawei olt get board count

