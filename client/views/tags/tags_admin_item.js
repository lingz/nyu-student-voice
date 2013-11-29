Template.tagsAdminItem.events({
  "click button": function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete the tag " + this.name)) {
      Tags.remove(this._id);
      // map remove the tag from existing posts
      Posts.update({tags: this.name}, {$pull: {tags: this.name}});
    }
  }
});
