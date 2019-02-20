import { setdataobject,retrieve,insertrow,deleterow,update,setitem} from '@/api/webdwapi.js'
var xmlHttpReturn; // 定义Ajax调用以后产生的全局返回值存放位置,Ajax调用通过jQuery实现

var uiview = null;

function setRow(rowid){
	console.log('set row:' + rowid)
	uiview.rowid = rowid
}

function setDWData(rowid,colid,data){
	console.log(rowid)
	console.log(colid)
	console.log(data)
	let uuid = uiview.uuid
	let data1 = data
	console.log('uuid:'+uuid)
	setitem({
		uuid,
		rowid,
		colid,
		data1
	})
}
/**
 * 绘图展示对象，从后台获取数据集合，并在前台负责完成展示工作
 */
class CWebDWUIView{
	// constructor function
	constructor(_parentId){
		this.uiArray = new Array();
		this.parentId = _parentId; // 绘图的根节点对象的ID和名称,代表一个界面上的DIV对象
		this.parentName = _parentId; // 名称与ID同名（基本约定）
		this.parentDom  = document.getElementById(_parentId); // 绘图的根节点对象
		this.uuid =""; //记录uuid的值
		this.rowid = 0; //当前行
		this.colid = 0; //当前列序号

		//保存this对象
		uiview = this;
	}
	
	// clean function
	// 删除设定根节点下面的所有子节点
	removeAllChild(){
		if(this.parentDom == null){
			console.log("parentDom is null;")
			return;
		}
		var children = this.parentDom.children;
		
		console.log("begin remove:children.length = "+children.length);
		
		for(var i=0;i<children.length;){
			// 从第一个开始删除，于是一个一个全删除掉了
			if(children[0] !=null){
				this.parentDom.removeChild(children[0]);
			}
		}
	}
	// draw function
	// draw all element in uiArray
	drawAllChild(){
		//this.uiArray = xmlHttpReturn;
		
		if(this.uiArray == null){
			console.log("uiArray is null,exit drawAllChild.");
			return;
		}
		if(this.parentDom == null){
			console.log("parentDom is null,exit drawAllChild.");
			return;
		}
		// 循环绘制所有对象
		// todo:根据classname来走分支对象进行DOM元素绘制
		for(var i=0;i<this.uiArray.length;i++){
			// get ui description
			var ui = this.uiArray[i];
			// convert it to dom object
			var uiComponent = new MyUIComponent(ui,this);
			// append it to parentObject
			//console.log("i,classname:"+i+" ,"+uiComponent.classname);
			this.parentDom.appendChild(uiComponent.node);
		}
	}	
		
	/**
	 * setDataobject function 这一方法用来在界面上设置数据窗口对象
	 * token 用户token, dwname 数据窗口名称
	 */
	SetDataObject(token,dwname){
		new Promise((resolve,reject) => {
        console.log('begin call setdataobject.')
        setdataobject({
          token,
          dwname
        }).then(res => {
          console.log(res)
          const data = res.data
          console.log('data:' + data)
          this.uuid = data.uuid;
          this.uiArray = data.uiobjList;
          this.removeAllChild();
          this.drawAllChild();
        //  resolve()
        }).catch(err => {
          console.log(err)
        //  reject(err)
        })
      })
	}

	/**
	 * 这一方法用来在界面上设置数据窗口对象，并检索后台数据
	 * 参数说明：token 用户token,dwname 数据窗口名称，args 检索参数
	 */
	Retrieve(token,dwname,args){
      new Promise((resolve,reject) => {
        console.log('begin call.')
        retrieve({
          token,
          dwname,
          args
        }).then(res => {
          console.log(res)
          const data = res.data
          console.log('data:' + data)
          this.uuid = data.uuid;
          this.uiArray = data.uiobjList;
          this.removeAllChild();
          this.drawAllChild();
        //  resolve()
        }).catch(err => {
          console.log(err)
        //  reject(err)
        })
      })
	}
	
	/**
	 * setDataobject function 这一方法用来在界面上设置数据窗口对象
	 */
	Insert(token,uuid){
      new Promise((resolve,reject) => {
        console.log('begin call insert.')
        insertrow({
          token,
          uuid
        }).then(res => {
          console.log(res)
          const data = res.data
          console.log('data:' + data)
          this.uuid = data.uuid;
          this.uiArray = data.uiobjList;
          this.removeAllChild();
          this.drawAllChild();
        //  resolve()
        }).catch(err => {
          console.log(err)
        //  reject(err)
        })
      })
	}
	/**
	 * setDataobject function 这一方法用来在界面上设置数据窗口对象
	 */
	Delete(token,uuid){
      new Promise((resolve,reject) => {
        console.log('begin call delete.')
        let rowid = this.rowid
        console.log('to delete rowid:' + rowid)
        deleterow({
          token,
          uuid,
          rowid
        }).then(res => {
          console.log(res)
          const data = res.data
          console.log('data:' + data)
          this.uuid = data.uuid;
          this.uiArray = data.uiobjList;
          this.removeAllChild();
          this.drawAllChild();
        //  resolve()
        }).catch(err => {
          console.log(err)
        //  reject(err)
        })
      })
	}
	
	/**
	 * 这一方法用来在界面上设置数据窗口对象，并检索后台数据
	 */
	Update(token,uuid){
      new Promise((resolve,reject) => {
        console.log('begin call update.')
        let rowid = this.rowid
        console.log('to delete rowid:' + rowid)
        update({
          token,
          uuid
        }).then(res => {
          console.log(res)
          const data = res.data
          console.log('data:' + data)
          this.uuid = data.uuid;
          this.uiArray = data.uiobjList;
          this.removeAllChild();
          this.drawAllChild();
        //  resolve()
        }).catch(err => {
          console.log(err)
        //  reject(err)
        })
      })
	}
}
/**
 * 这个类用来封装后台获取的所有有效元素信息
 */
class MyUIComponent{
	/**
	 * constructor function
	 */
	constructor(uiobj,pObject){
		//设置所属的父对象
		this.pObject = pObject
		//转换比例，默认为0.3
		this.convertRate = 0.4;
		
		// 如果传入转换比例，则使用新的转换比例
		// if(_convertRate !=null){
		//	this.convertRate = _convertRate;
		// }
		
		// 通用属性
		this.id = uiobj.id;
		this.name = uiobj.name;
		this.classname = uiobj.classname;
		this.text = uiobj.text;
		this.rowid = uiobj.rowid;
		this.colid = uiobj.colid;
		
		// 位置信息,乘以转换比例
		this.left = uiobj.left * this.convertRate;
		this.top = uiobj.top * this.convertRate;
		this.width = uiobj.width * this.convertRate;
		this.height = uiobj.height * this.convertRate;
		
		// 组合框的特定信息
		this.values = uiobj.values;
		this.selectedIndex = uiobj.selectedIndex;
		
		// 单选钮的特定信息
		this.children = uiobj.childElements;
		
		// 检查框的特定信息
		this.value = uiobj.value;
		
		// 节点信息初始化
		this.node = null;
		this.textnode = null;
		
		this.toHTMLNode();
	}
	
	/**
	 * convert this object to HTML DOM node
	 */
	toHTMLNode(){
		var node=document.createElement("div");
		node.style.position="absolute";
		node.style.left  = this.left + "px";
		node.style.top = this.top +"px";
		node.style.width  = this.width + "px";
		node.style.height = this.height +"px"
		node.style.background ="#f0f0f0";
		node.style.fontSize ="smaller";
		// 根据传入的参数的属性来进行判断走分支
		if(this.classname == "" ){
			this.classname = "JLabel";
		}
		
		// 创建一个TextNode代表JLabel，存储显示标签值
		if(this.classname == "JLabel"){
			// 创建一个TextNode代表JLabel，存储显示标签值
			var textnode=document.createTextNode(this.text);
			// 设置textnode的默认样式
			node.appendChild(textnode);
			this.node = node;
			this.textnode = textnode;
			return node;
		}
		
		// 创建一个输入文本框，存储显示标签值
		if(this.classname == "JTextField"){
            var input1 = document.createElement("input");
            input1.type = "text";
            input1.value = this.text;
            input1.length = this.width+"px";
            input1.rowid = this.rowid;
            input1.colid = this.colid;
            input1.id = 'TEXT_'+input1.rowid+"_"+input1.colid;
            //when onclick,set currentrow
            input1.onclick = function(){
            	//alert(input.value);
           		setRow(input1.rowid);
            }
            
            //when datachange, modify buffer data value
            input1.onchange = function(){
            	//alert(input1)
            	alert(input1.id)
            	alert(input1.value);

            	let rowid = 0;
            	let colid = 0;
            	let id = input1.id;
            	let data = input1.value
            	let data2 = id.split('_');
            	rowid = data2[1];
            	colid = data2[2];

            	setDWData(rowid,colid,data);
            }
            node.appendChild(input1);
			this.node = node;
			this.textnode = input;
			return node;
		}
		
		// 创建一个下拉选择列表
		if(this.classname == "JComboBox"){
            var input = document.createElement("select");
            // input.value = this.text;
            input.length = this.width+"px";
            console.log("combo values:"+this.values);
            // 根据返回的values字段，初始化下拉列表的数据项
            var combovalues = this.values.split("/");
            for (var combo_id = 0; combo_id <combovalues.length; combo_id++){
            	var data = combovalues[combo_id].split("\t");
            	if(data.length>1){
            		
            		var option = document.createElement("option");
            		option.setAttribute("value",data[0]);// 设置option属性值
            		option.appendChild(document.createTextNode(data[1]));
            	}
            	input.appendChild(option);
            }
            input.selectedIndex = this.selectedIndex;
            // alert("selectedIndex:"+this.selectedIndex);
            
            node.appendChild(input);
			this.node = node;
			this.textnode = input;
			return node;
		}
		
		// 开始进行单选钮的处理过程，单选钮是封装在一个JPanel里面的
		if(this.classname == "JPanel"){
			console.log("JPanel子节点数："+this.children.length);
			for(var i=0;i<this.children.length;i++){
				var mychild = this.children[i];
				
				// 处理单选按钮
				if(mychild.classname == "JRadioButton"){
					var childdiv = document.createElement("div");
					childdiv.style.top=(i * 20)+"px";
					childdiv.style.left = "0px";
					
					var childnode = document.createElement("input");
					childnode.type = "radio";
					childnode.name = this.name+"_radio";
					//设置是否选中的状态
					childnode.checked = mychild.selected;
					console.log("childnode.name:"+childnode.name);
					// 单选钮的value属性放在Tag字段里面
					childnode.value = mychild.Tag;
					console.log("childnode.value:"+childnode.value);
					// 创建一个文本节点
					console.log("mychild.Text:"+mychild.Text);
					var textnode=document.createTextNode(mychild.Text);
					
					
					childdiv.appendChild(childnode);
					childdiv.appendChild(textnode);
					node.appendChild(childdiv);
		            this.node = node;
		            this.textnode = null;
				}
			} 
			return node;
		}
		
		//开始进行复选框的编辑显示支持
		if(this.classname == "JCheckBox"){
            var input = document.createElement("input");
            input.type = "checkbox";
            input.checked = this.value;
            //input.length = this.width+"px";
            //再增加一个文本节点来显示
            var textnode=document.createTextNode(this.text);
            node.appendChild(input);
            node.appendChild(textnode);
			this.node = node;
			this.textnode = input;
			return node;			
			
		}
		console.log("不支持的classname:"+this.classname);
		this.node = node;
		return node;
	}
}

// export xmlHttpReturn = xmlHttpReturn
export const WebDWUIView = CWebDWUIView
