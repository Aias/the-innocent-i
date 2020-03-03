---
layout: site
pageStyle: fragments
permalink: 'commonplace/{{ pagination.items[0].name | slugify }}/index.html'
pagination:
    data: commonplace.works.all
    size: 1
    alias: work
    reverse: true
---

## {% split work.name %}

*{{ work.name }} is {% article work.type %} {{ work.type | lower }} by {% makeList work.creator_names %}.{% for creatorId in work.creator %}{% set creator = commonplace.creators.byId[creatorId] %}{% if creator.profession %} {{ creator.last_name }} is {% article creator.profession[0] %} {% set profession %}{% makeList creator.profession %}{% endset %}{{ profession | lower }}.{% endif %}{% endfor %}*

{% if work.direct_extracts %}
{% for extractId in work.direct_extracts %}
{% set extract = commonplace.extracts.byId[extractId] %}
<h3 id="{{extract.title | slugify}}">{{ extract.title }}</h3>

{{ extract.extract_text | safe }}
{% endfor %}
{% else %}
### 404: extracts not found

This work is in my library, but it looks like I haven't entered it into the commonplace book yet.
{% endif %}