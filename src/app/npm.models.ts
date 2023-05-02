export interface NpmUserResponse {
    name: string
    email: string
}
export interface NpmScoreResponse {
    final: number
    detail: {
        quality: number
        maintenance: number
        popularity: number
    }
}

export interface NpmPackageResponse {
    name: string
    scope: string
    version: string
    description: string
    author: NpmUserResponse
    maintainers: NpmUserResponse[]
    score: NpmScoreResponse
}
export interface NpmObjectResponse {
    package: NpmPackageResponse
}
export interface NpmSearchResponse {
    objects: NpmObjectResponse[]
}
//{"objects":[{"package":{"name":"@youwol/cdn-client","scope":"youwol","version":"1.0.10","description":"Library for dynamic npm's libraries installation from YouWol's CDN.","date":"2022-12-12T08:24:34.679Z","links":{"npm":"https://www.npmjs.com/package/%40youwol%2Fcdn-client","homepage":"https://github.com/youwol/cdn-client#README.md"},"author":{"name":"greinisch@youwol.com"},"publisher":{"username":"youwol-guillaume","email":"greinisch@youwol.com"},"maintainers":[{"username":"jehadmelad","email":"jd.melad@gmail.com"},{"username":"youwol-jdecharne","email":"jdecharne@youwol.com"},{"username":"fmaerten","email":"fmaerten@youwol.com"},{"username":"youwol-guillaume","email":"greinisch@youwol.com"}]},"score":{"final":0.39781323454906076,"detail":{"quality":0.8760806960830108,"popularity":0.05234959730711684,"maintenance":0.3333333333333333}},"searchScore":100000.34}],"total":1,"time":"Tue May 02 2023 08:53:25 GMT+0000 (Coordinated Universal Time)"}
