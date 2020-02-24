---
layout: site
pageStyle: fragments
permalink: 'commonplace/works/{{ pagination.items[0].name | slugify }}/index.html'
pagination:
    data: commonplace.works.all
    size: 1
    alias: work
    reverse: true
---

## {% split work.name %}

*{{ work.name }} is {% article work.type %} {{ work.type | lower }} by {% makeList work.creator_names %}.{% for creatorId in work.creator %}{% set creator = commonplace.creators.byId[creatorId] %}{% if creator.profession %} {{ creator.last_name }} is {% article creator.profession[0] %} {% set profession %}{% makeList creator.profession %}{% endset %}{{ profession | lower }}.{% endif %}{% endfor %}*

{% for extractId in work.direct_extracts|reverse %}
{% set extract = commonplace.extracts.byId[extractId] %}
### {{ extract.title }}

{{ extract.extract_text | safe }}
{% endfor %}
