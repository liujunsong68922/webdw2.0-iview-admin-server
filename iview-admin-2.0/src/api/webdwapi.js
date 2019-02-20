import axios from '@/libs/api.request'

export const setdataobject = ({ token, dwname }) => {
  const data = {
    token,
    dwname
  }
  console.log('begin call setdataobject.')
  console.log(data)
  return axios.request({
    url: 'setdataobject?token=1&dwname=' + dwname,
    method: 'get'
  })
}

export const retrieve = ({ token, dwname,args }) => {
  const data = {
    token,
    dwname
  }
  console.log('begin call retrieve.')
  console.log(data)
  return axios.request({
    url: 'retrieve?token=1&dwname=' + dwname +'&args='+args,
    method: 'get'
  })
}

export const insertrow = ({ token,uuid }) => {
  const data = {
    token,
    uuid
  }
  console.log('begin call insertrow.')
  console.log(data)
  return axios.request({
    url: 'insertrow?token=1&uuid=' + uuid,
    method: 'get'
  })
}

export const deleterow = ({ token,uuid,rowid }) => {
  const data = {
    token,
    uuid,
    rowid
  }
  console.log('begin call delete.')
  console.log(data)
  return axios.request({
    url: 'deleterow?token=1&uuid=' + uuid +'&rowid='+rowid,
    method: 'get'
  })
}

export const update = ({ token,uuid }) => {
  const data = {
    token,
    uuid
  }
  console.log('begin call update.')
  console.log(data)
  return axios.request({
    url: 'update?token=1&uuid=' + uuid ,
    method: 'get'
  })
}

export const setitem = ({ uuid,rowid,colid,data1 }) => {
  console.log(uuid)
  console.log(rowid)
  console.log(colid)
  console.log(data1)
  const data = {
    uuid,
    rowid,
    colid,
    data1
  }
  console.log('begin call setdata.')
  console.log(data)
  return axios.request({
    url: 'setitem?uuid=' + uuid +'&rowid=' + rowid + '&colid=' + colid + '&data=' + data1 ,
    method: 'get'
  })
}
