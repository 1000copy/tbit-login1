

# 第二阶段开发

## team work list

1. 搭建github环境。建立私有库，建立我们几个人的协作方式
2. SNMP模块原型设计。使用vue+bulma技术，对OLT对象和ONU对象进行曾删改查。所有对象和字段名称都可以使用英文。
3. 烽火OLT+ONU调试验证。获取OLT的设备描述、插槽、插板、端口、上联口、虚拟局域网信息。获取ONU描述、端口信息、状态、模式信息

## researth task

学习目标。完全看得懂我给的文档中的概念和术语

1. 华为，中兴OLT，烽火的OLT/ONU的基本概念和日常操作。技术部提供
2. 开发库学习。Bulma，GraphQL，Sequelize，net-snmp。刘传君提供脚手架
3. snmp协议学习。从库的源代码学习，阅读RFC
4. radius协议学习。从库的源代码学习，阅读RFC


# 管理对象

OLT，ONU，VLAN，ODN，PORT，Slot，Card，Signal，ONUMode，SpeedProfile，EthMode（Lan，Access，Hybrid，Trunk，Transparent。

## OLT

OLT ::=  Detail  + Card* + Pon Ports + Uplink + Vlan + ONU MgmtIP + VoIP Profile 
	Detail ::= IP Address + Telnet + SNMP + IPTV Module（disable|Enable）+ Version + Pon Type
		Telnet ::= Port + User + Password 
		SNMP ::= Community + UDP Port
		Community ::= ReadonlyCommunity + ReadwriteCommunity
		Verison ::= HW + SW 
		Pon Type ::= GPON | EPON
	Card ::= Slot Index + Type + RealType + Port Number + Software Version + Status + Role  + Update Info Date
		Type ::= RealType ::= 
			SMXA (Main Control)| PRAM Card(Power card) | GTGH (Service card/Gpon/10GPON EtherCar) | Fan 
		Port Number = number
		Status ::= Online | Offline
		Role ::= Main + Standby
		Update Info Date = Date
	Pon Ports ::= SlotIndex + BoardType +Type + AdminState + Status + ONUOnlineNumber+ONUTotalNumber+Memo+Range+TXPower
		Type = (GPON|EPON)
		AdminState ::= (enable|disable)
		Status ::= (up|down)
		Range = (0-20000m)
		TXPower = dBm
	Uplink ::= Port Name + Type +  Negotiation + AdminStatus + Status + MTU 
				+ WaveLength + Templature+  Mode:Tagged VLANs + PVID Untagged???
		Type ::= Fiber | Copper 
		AdminStatus ::= enable | disable
		Status ::= UP | DOWN
		Mode:Tagged VLANs ::= Lan，Access，Hybrid，Trunk，Transparent |:| Vlan Pair(etc 1001-1005)???
		Negotiation ::= Auto + ???
	Vlan ::= Vlan-ID +Memo + UsedFor + DHCP Snooping + Lan2Lan 
		UsedFor ::= IPTV + Mgmt/VoIP(Bool)
		IPTV = Bool - multicast VLAN used for IPTV
		DHCP Snooping = Bool  - DHCP Snooping on VLAN
		Lan2Lan = Bool - enable direct communication between ONUs on this VLAN 
		Vlan-ID ::= 1001..		
	???ONU MgmtIP  ::= ip + subnetmask + defaultgateway + dns1 + dns2	

## ONU

ONU ::= Olt + Board + Port + Name + Status +  SN（macAddress)+ Zone +  BR + AttachedVLAN + 
		  MgmtIPEnable + SpeedProfile* + Port* + VOIPConnection + CATV  + WAN-VLan-ID + Traffic* + Signal*
	Status ::=  Online | Pwrfail | LoS | N/A | disabled 
	ONU Type ::= Pon type + Name + Ethernet Port Count + WiFi SSID + VoIP Port Count	
	BR ::= Bridge|Router
	AttachedVLAN ::= 1001..1004..
	MgmtIPEnable = Bool
	Port ::= PortName + AdminStatus + Mode + DHCP
	PortName = ex eth_0/1
	AdminStatus = enable | disable
	Mode = Lan | 
	DHCP = from ONU | from ISP
	VOIPConnection = enable | disable
	WAN-VLan-ID ::= 1001..1004..
	CATV = enable | disable
	VOIPConnection = enable | disable
	Traffic ::=  (DateTime + Bytes)*
	Signal :=    (DateTime + dBm)*

## ONU Filter
 
 	by Status Online | Pwrfail | LoS | N/A | disabled |All
 	by Type EPON|GPON
 	by olt 

## SpeedProfile

SpeedProfile ::= Value + Type + Unit
	Value ::= Number
	Type ::=  Internet |
	Unit ::= MB|GB


# 任务书

今天是你来公司的第一天，欢迎加入润州。

润州是一家主营业务为FTTH光纤入户设备和线路的公司，当前面向拉美市场。软件为从零到一的新业务，目前配置3人，未来会根据业务情况继续扩展。主要协同部门为公司技术部，他们非常善于网络工程中的设备管理技术，可以支持我们搭建设备开发环境。

和软件相关的FTTH光纤入户设备，主要是是网络中智能设备，包括路由器，OLT，ONU。其他的非智能设备和线路如ODN，Fiber等我们不要求关心。

软件包括客户管理模块，和路由器对接的Radius模块，和OLT、ONU对接的监控模块（技术主要是SNMP模块）。

SNMP模块可以有你负责。具体而言

1. OLT对接。公司内有各种类型的设备，但是建议从fiberhome（烽火）开始，且我有找到一个npm模块，可以从此模块开始。https://www.npmjs.com/package/snmp-fiberhome 。希望获得OLT的一般描述信息，板卡构成、温度、风扇、端口信息等。你可以先从搭建环境和改造此模块代码开始。
2. ONU对接。公司内有各种类型的设备，这个还在产品需求阶段。你暂时可以不管

另外，需要你全面系统掌握SNMP协议基础，这是我们的特定领域知识。有了它们才可以写出功能全面，系统稳定的代码。技术部门可以协助你搭建环境。

我们使用nodejs + vuejs + mysql 开发。你可以先搭建nodejs开发环境。先看看我给你的资料和代码。下午我带你，我们一起开始。

中午吃饭可以在食堂，下到一楼后问下，或者跟着人流走。可以使用支付宝付款。
