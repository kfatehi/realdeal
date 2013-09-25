/*jslint maxlen: 200 */
// Underscore Templates

App.Templates["template-containers-item"] =
  "<td class=\"container-name\">" +
  "  <div class=\"container-title note-view\"><%= title %></div>" +
  "</td>" +
  "<td class=\"container-action\">" +
  "  <div class=\"btn-group pull-right\">" +
  "    <button class=\"btn container-edit\">" +
  "      <i class=\"icon-pencil\"></i>" +
  "    </button>" +
  "    <button class=\"btn container-delete\">" +
  "      <i class=\"icon-trash\"></i>" +
  "    </button>" +
  "  </div>" +
  "</td>";

App.Templates["template-container"] =
  "<div id=\"container-pane-view\" class=\"pane\">" +
  "  <div id=\"container-pane-view-content\"></div>" +
  "</div>" +
  "<div id=\"container-pane-edit\" class=\"pane\">" +
  "  <form id=\"container-form-edit\">" +
  "    <input id=\"input-title\" class=\"input-block-level\"" +
  "           type=\"text\" placeholder=\"title\"" +
  "           value=\"<%= title %>\">" +
  "    <textarea id=\"input-text\" class=\"input-block-level\"" +
  "              rows=\"15\"><%= text %></textarea>" +
  "  </form>" +
  "</div>";

App.Templates["template-container-view"] =
  "<div class=\"well well-small\">" +
  "  <h2 id=\"pane-title\"><%= title %></h2>" +
  "</div>" +
  "<div id=\"pane-text\"><%= text %></div>";

