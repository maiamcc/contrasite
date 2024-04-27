module Jekyll
  module FootnoteFilter
    def footnoter(txt)
      # replaces `[^n]` with `<sup class="fn">n<sup>`
      txt.gsub(/\[\^(\d+)\]/, "<sup class=\"fn\">\\1</sup>")
    end
 end
end

Liquid::Template.register_filter(Jekyll::FootnoteFilter)

Jekyll::Hooks.register :site, :post_read do |site|
  if site.data.has_key? 'dances'
    site.data['dances'].each do |dance|
      # add 'titleSort' field to all documents — document's title with any leading articles stripped
      dance['titleSort'] = dance['title'].sub(/^(an? |the )\s*/i, "")
    end
  end
end
