module Jekyll
  module FootnoteFilter
    def footnoter(txt)
      # replaces `[^n]` with `<sup class="fn">n<sup>`
      txt.sub(/\[\^(\d+)\]/, "<sup class=\"fn\">\\1</sup>")
    end
 end
end

Liquid::Template.register_filter(Jekyll::FootnoteFilter)