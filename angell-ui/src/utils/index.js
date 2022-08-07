
/**
 * 转换size为k、kb、mb...
 * @param bytes 大小(字节单位)
 * @param decimals 保留的位数 默认两位
*/
export function bytesToSize(bytes, decimals = 2) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  // return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  return (bytes / Math.pow(1024, i)).toFixed(decimals) + ' ' + sizes[i]
}
