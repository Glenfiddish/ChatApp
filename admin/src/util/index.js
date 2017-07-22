//封装失败
const addData = (item,table,apiFunction)=>{
  apiFunction(data,(res)=>{
   if(isSuccess(res.status)){
      table.add(item)
      return table
   }else{
      throw new error('增加失败')
   }
  })
}

const editData = (item,table,index,apiFunction)=>{
  apiFunction(data,(res)=>{
    if(isSuccess(res.status)){
      table[index]=item
      return table
    }else{
      throw new error('编辑失败')
    }
  })
}

const deleteData = (item,table,index,apiFunction)=>{
  apiFunction(data,(res)=>{
    if(isSuccess(res.status)){
      table.splice(index,1)
      return table
    }else{
      throw new error('删除失败')
    }
  })
}

let handleTableData = (type,item,apiFunction,table,index)=>{

  if(type=='add'){
      addData(item,table,apiFunction)
    }else if(type=='edit'){
      editData(item,table,index,apiFunction)
    }else if(type=='delete'){
      deleteData(item,table,index,apiFunction)
    }else{
      throw new error('cant find method')
    }
}

let isSuccess = (arguments)=>{
  if(typeof arguments == 'string' ){
    return  arguments.toLowerCase() == ('true'||'success') ? true : false
  }else if(typeof arguments  == 'boolean'){
    return arguments
  }else{
    return false
  }
}

export {
  handleTableData,
  isSuccess
}
