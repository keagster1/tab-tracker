<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Search</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-text-field v-model="search"></v-text-field>
          <v-btn @click="listToCategories" icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line>
          <template v-for="(item, index) in filteredItems">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile v-else :key="item.title" avatar @click="onClick(item.title)">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        // Items that get displayed
        {
          header: "Characters"
        },
        {
          title: "Mike",
          subtitle: "Character",
          avatar:
            "data:image/jpeg;base64,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"
        },
        { divider: true, inset: true },
        {
          header: "Locations"
        },
        {
          header: "Items"
        }
      ],
      filteredItems: [], // Filtered list of data from rawData
      search: "",
      rawData: [
        // Backend data (not directly displayed)
        {
          // information name(title), description(subtitle), type(header)
          name: "Mike",
          description: "Mike is a cool guy.",
          type: "Character",
          avatar:
            "data:image/jpeg;base64,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"
        },
        {
          // information name(title), description(subtitle), type(header)
          name: "Tom",
          id: 1,
          description: "Mike is a bad guy.",
          type: "Character",
          avatar:
            "data:image/jpeg;base64,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"
        },
        {
          // information name(title), description(subtitle), type(header)
          name: "Sword",
          description: "A cool sword.",
          type: "Item",
          avatar:
            "data:image/png;base64,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"
        },
        {
          // information name(title), description(subtitle), type(header)
          name: "New York",
          id: 2,
          description: "A cool city.",
          type: "Location",
          avatar:
            "data:image/png;base64,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"
        },
        {
          // information name(title), description(subtitle), type(header)
          id: 1,
          name: "Start",
          description: "The start of the story",
          type: "Event",
          avatar:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAZlBMVEX///8BAQEAAADT09Px8fE4ODhCQkL29vZYWFgrKyv8/PydnZ0oKCja2tqYmJgbGxtHR0e6urpnZ2fh4eFfX19NTU3BwcHHx8dSUlJxcXGjo6N5eXmGhoYxMTEPDw8iIiKvr6+Ojo5U/cehAAAEdElEQVRoge2b67qqIBCGdTIzD6VZaa60uv+b3CKKjOABw1zPXn1/3EsYXkFmgMltGENKHCju1mAViXYvH8KnqhWvAxAVgZqVlVdmt/ncAMAsBRdXyexUmQE8Z4NfFbdsQqnL1rE2O88Gn2kLJiQqVhuoB8pRGygZ+KoINr/g3wlOvNT3j1TFWQBbxXFU1SzEYA/qsocfvhLxUdyIen2jVATDBMnAvPxDJwwGIdROUKMcGdgckRyMKsARueazcT1WQQ5m5fIrA3N+XIHbemXZAXG7z75Mj2klRt6ITS4ILmtF9bzaii0uCS4HnM6wTNLiomCzXjELWdGy4CImcUPWIFwQOFEBB+NgyAyyy5A1kRutEUDMtTcIJkPj+rXZibRxlzZP4pMDEr8Ec2dUSzoppK/kOe7HJtyNqit0B7Ihf4Qgq/coB+MofSQ65ZMjCWjOjh/3wS5vDdpLoif5Zywdp+olm9IG6VgblpfenlVktyZwmYsmP+krMHpHmo5GT4PdrVo4BVx2ZYeseiZGBe59eLQI3yZx2WD3x8RRcD3nqazT+JRm5JiZXaXzZwxcloZRFdti7zGZS8zuAZkVVnLutRoGkyXMvzhpWIACtzKzU+eSD1gxcK9fNuorl1+ZUX+7gz1eTl/wF/wfgxX99P3r6j1eFzzlUPa2JGDYf0DNBhSB8d5hEbnOnwfDn+vxF7wa2NWqyeB462uVHUwEn3QH6LQXjP3YVt1Hj1xha03rcQjCUmXKFy/xtuyOChhy79AqI3f2h668fXk75CsebGKK6pTneSWwg9ygPKTSdAxWWt7+QXdOgmmmCE6RNQGHIvgiB6PcsPd2j1cD20JYWR5skZdZ2IIK8upR5lsVDB0wIHBW9LkT4IyFjh5zk+s1nA9AZJ1D3Ze54cgbDOa5yu5kXyOqqzOewkxZZTLd7IjT9aYAtnHIHON2K88OmRPStGqaCo4L1GNZv7plGhcJsXW5NwlFYj01P77EAdW1zjeDHXQV200zUXPLISEF1bnPdae4OeDJYzVthu1tRHea7cczwHoCyBf8Bb8HHliP48aP/68ef8Erhsww2FBdG7C96SpoF4nmFlkkQlRHdZEQ1j7ZqigrU1sWEdjNpRuBgfV4/kYA+bG7x89dl5v9V5gNHhzq8V2mpqF+Y3sbke3tdvb2dtUNPWftrXSEab5Q6ZnV+CvIJY6p5hLH1BEwzQjsunLfP5gPn4//ag7kQ+mmPPNaZSRvtve6ynLyPHxFr0qwoTqKCbZ1Uor2Sufj8o1qFvs+ewRsnbZadelPlGM/LtFa1brX7/0x5CNgWK3H8EFwyoGbzzIhHjd8V1YNAzNgxwGT/wp4KUXNL+aPXfs5H791Wkhxzo4l9VNUf0ORWcJir1FWlLOJTL7ftPgEnbi90aeCA1WD+zOYNdQpFjJoGn7C17x6xWZT9GEyvJrZNvKrg27uuV01PkgGOPMhMuPf/aJYeOH/HRJr33bIlYpRKvBCv1iSaT7se09wdGMhwaJRwQeWvyn6B2eme7kH7f6NAAAAAElFTkSuQmCC",
          rawdate: "0000-000-00",
          day: "Beginning",
          month: "Jan",
          year: null
        },
        {
          // This is a tag and will not be displayed
          id: 1,
          eventId: 1,
          infoId: 1
        },
        {
          // This is a tag and will not be displayed
          id: 2,
          eventId: 1,
          infoId: 2
        }
      ]
    };
  },
  mounted() {
    this.listToCategories();
  },
  watch: {
    search() {
      if (this.search.length) {
        this.listToCategories(
          this.rawData.filter(item => {
            if (item.name) {
              return item.name
                .toLowerCase()
                .includes(this.search.toLowerCase());
            } else {
              return item;
            }
          })
        );
      } else {
        this.filteredItems = this.items;
        this.listToCategories(this.rawData);
      }
    }
  },
  methods: {
    onClick(title) {
      this.logRelatedTags(title);
    },
    logRelatedTags(title) {
      // Get event related to title,
      // Look for tags with the events id
      // Print out infoid's of matching tags

      // Get event id
      let eventId = null;
      this.rawData.forEach(element => {
        if (element.name === title) {
          eventId = element.id;
        }
      });

      if (!eventId) return;

      // Get matching tags and print out infoids of those tags
      this.rawData.forEach(e => {
        // Missing name means its a tag
        if (!e.name) {
          if (e.eventId === eventId) {
            // Now get objects of those ids
            this.rawData.forEach(e2 => {
                if (e2.id && e2.type && e2.type !== 'Event' && e2.id === e.infoId) {
                    console.log(e2.name)
                }
            })
          }
        }
      });
    },
    listToCategories(list = this.rawData) {
      let categories = []; // Local array to keep track of data as we convert
      let newCategory = true; // Flag to decide if we need to add a new header or not

      // Convert tags into events and information
      let listCopy = [...list];
      listCopy.forEach(item => {
        if (!item.name && this.search.length > 0) {
          // Find corresponding event within raw data
          this.rawData.forEach(e => {
            // Found event
            if (e.type === "Event") {
              if (e.id === item.eventId) {
                // Found matching event
                const temp = Object.assign({}, e);
                temp.description = "Contains matching tag";
                // This isnt working... Need another loop
                let dup = false;
                list.forEach(element => {
                  if (element.name === e.name) {
                    dup = true;
                  }
                });
                if (dup) return;
                list.push(temp);
              }
            }
          });
          return;
        }
      });

      // Convert raw list into category object array
      list.forEach(item => {
        if (!item.name) {
          return;
        }
        // For each item in raw data list
        categories.forEach(cat => {
          // For each category in category array
          // If the items header matches an existing category,
          // add the item to that category
          if (cat[0].header && cat[0].header === item.type) {
            cat.push(item);
            newCategory = false;
          }
        });
        // Else Add New Category
        if (newCategory) {
          let newCat = { header: item.type };
          categories.push(newCat);
          categories[categories.length - 1] = [
            categories[categories.length - 1],
            item
          ];
        }

        // Reset Flag
        newCategory = true;
      });

      // Convert category object array into displayable item list
      // item (title, subtitle, avatar)
      this.filteredItems = [];
      // Each category
      categories.forEach(cat => {
        // Each entry
        cat.forEach(row => {
          if (row.header) {
            this.filteredItems.push({
              header: row.header
            });
          } else {
            this.filteredItems.push({
              title: row.name,
              subtitle: row.description,
              avatar: row.avatar
            });
            this.filteredItems.push({
              divider: true,
              inset: true
            });
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
