module Jekyll
  module FootnoteFilter
    def footnoter(txt)
      # replaces `[^n]` with `<sup class="fn">n<sup>`
      txt.gsub(/\[\^(\d+)\]/, "<sup class=\"fn\">\\1</sup>")
    end
  end

  module SlugFilter
    def legacy_slugify(txt)
      # given a string, create a slug that conforms to my legacy format
      # (i.e. makes everything just one word, instead of kebab casing)
      # e.g. "Hello, world" --> "helloworld"
      txt.gsub(/[^a-zA-Z\d]/, "").downcase
    end
  end
end

Liquid::Template.register_filter(Jekyll::FootnoteFilter)
Liquid::Template.register_filter(Jekyll::SlugFilter)

Jekyll::Hooks.register :site, :post_read do |site|
  if site.data.has_key? 'dances'
    site.data['dances'].each do |dance|
      # add 'titleSort' field to all documents — document's title with any leading articles stripped
      dance['titleSort'] = dance['title'].sub(/^(an? |the )\s*/i, "")
    end
  end
end
