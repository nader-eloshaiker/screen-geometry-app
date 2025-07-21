const first = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
const second =
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwiaHR0cHM6Ly9jbGFpbXMuc2NyZWVuZ2VvbWV0cnkuY29tL25hbWUiOiJKb2UgQmxvZ3MiLCJodHRwczovL2NsYWltcy5zY3JlZW5nZW9tZXRyeS5jb20vZW1haWwiOiJqb2UuYmxvZ3NAZG9tYWluLmNvbSIsImh0dHBzOi8vY2xhaW1zLnNjcmVlbmdlb21ldHJ5LmNvbS9wcm9maWxlSWQiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNTE2MjM5MDIyfQ'
const third = 'okRPMhoaT1NlDS6-KaHiXM0onQdDMyOdb3cJBwlNVWY'

// Stubbed token resolver
// TODO: real token resolver should be set from identity service
export const mockAccessTokenResolver = () => Promise.resolve(`${first}.${second}.${third}`)
