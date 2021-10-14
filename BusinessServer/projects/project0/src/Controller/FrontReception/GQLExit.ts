export function GQLDrain(status: number, data: any) {
  var final_data = { status: status, data: data }
  var final_data_str = JSON.stringify(final_data)
  return final_data_str
  //   var encrypted = AESEncryption(final_data_str)
  //   return encrypted
}

export function GQLDrainError() {
  return GQLDrain(-1, {})
}

function AESEncryption(data: any): string {
  return ""
}
