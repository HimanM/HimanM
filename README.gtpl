<p align="center"><img src="https://raw.githubusercontent.com/HimanM/HimanM/main/ctt-600px-github.png" /></p>

### Socials

<p align="left"> 
<a href="https://www.github.com/HimanM" target="_blank" rel="noreferrer"> 
  <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github-dark.svg" /> 
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" /> 
      <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" width="32" height="32" /> 
  </picture> 
</a> 
<a href="http://www.instagram.com/himanmanduja" target="_blank" rel="noreferrer"> 
  <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/instagram-dark.svg" /> 
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/instagram.svg" /> 
      <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/instagram.svg" width="32" height="32" /> 
  </picture> 
</a> 
<a href="https://www.linkedin.com/in/himanm" target="_blank" rel="noreferrer"> 
  <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin-dark.svg" /> 
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" /> 
      <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" width="32" height="32" /> 
  </picture> 
</a>

<p align="left"><img src="https://raw.githubusercontent.com/HimanM/HimanM/main/github-metrics.svg" /></p>

### 🏅 Certifications

<p align="left">
  __CREDLY_BADGES__
  <a href="https://learn.microsoft.com/api/credentials/share/en-us/Himanman/646B140D45887B94?sharingId=157C81941C0409CE" target="_blank" rel="noreferrer" style="margin-right: 10px;">
    <img src="assets/certs/github-foundations.png" height="110" />
  </a>
</p>

### 👷 Check out what I'm currently working on
{{ range recentContributions 5 }}
- [{{ .Repo.Name }}]({{ .Repo.URL }}) - {{ .Repo.Description }}
{{- end }}
### 🌱 My latest projects
{{ range recentRepos 5 }}
- [{{ .Name }}]({{ .URL }}) - {{ .Description }}
{{- end }}
### 🔨 My recent Pull Requests
{{ range recentPullRequests 5 }}
- [{{ .Title }}]({{ .URL }}) on [{{ .Repo.Name }}]({{ .Repo.URL }})
{{- end }}
### ⭐ Recent Stars
{{ range recentStars 5 }}
- [{{ .Repo.Name }}]({{ .Repo.URL }}) - {{ .Repo.Description }}
{{- end }}
