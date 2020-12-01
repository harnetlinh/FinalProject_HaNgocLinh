const constructorSSML = {
    id : 0,
    p : {
      isDouble : 1,
      isActive : 0,
      tag : "p",
      attributes : {},
      class: 'pp',
    },
    paragraph : {
      isDouble : 1,
      isActive : 0,
      tag : "paragraph",
      attributes : {},
      class : "paragraph",
    },   
    say_as : {
      isDouble : 1,
      isActive : 0,
      tag : "say-as",
      class : "say_as",
      attributes : {
        interpret_as : {
          isActive : 0,
          text : "interpret-as",
          value: "",
          options: ["date","time","literal","telephone","currency","cardinal","ordinal","digits"]
        },
        format : {
          isActive : 0,
          text : "format",
          value: "",
          options: []
        },
      },
    },
    emphasis : {
      isDouble : 1,
      isActive : 0,
      tag : "emphasis",
      class : "emphasis",
      attributes : {
        level: {
          isActive : 0,
          text: "level",
          value: "",
          options: ["strong","moderate","none","reduced"]
        }
      }
    },
    prosody :  {
      isDouble : 1,
      isActive : 0,
      tag : "prosody",
      class : "prosody",
      attributes : {
        pitch : {
          isActive : 0,
          text: "pitch",
          value: "",
          options: ["x-high","high","medium","low","x-low","default"]
        },
        contour : {
          isActive : 0,
          text: "contour",
          value: "",
          options: []
        },
        ranger : {
          isActive : 0,
          text: "ranger",
          value: "",
          options: ["x-high","high","medium","low","x-low","default"]
        },
        rate : {
          isActive : 0,
          text: "rate",
          value: "",
          options: ["x-fast","fast","medium","slow","x-slow","default"]
        },
        duration : {
          isActive : 0,
          text: "duration",
          value: "",
          options: []
        },
        volume : {
          isActive : 0,
          text: "rate",
          value: "",
          options: ["slient","x-soft","soft","medium","loud","x-loud","default"]
        }
      },
    },
    break : {
      isDouble : 0,
      innerText : "_",
      class : "break",
      isActive : 0,
      tag : "break",
      attributes : {
        strength : {
          isActive : 0,
          text: "strength",
          value: "",
          options: ["none","x-small","small","medium","large","x-large"]
        },
        time : {
          isActive : 0,
          text: "time",
          value: "",
          options: []
        }
      }
    },
    audio : {
      isDouble : 0,
      isActive : 0,
      innerText: "audio",
      class : "audio",
      tag : "audio",
      attributes : {
        src : {
          isActive : 0,
          text: "src",
          value: "",
          options: []
        }
      }
    },
    desc : {
      isDouble : 1,
      isActive : 0,
      tag : "desc",
      attributes : {}
    },
    mark : {
      isDouble : 1,
      isActive : 0,
      tag : "mark",
      attributes : {
        name : {
          isActive : 0,
          text: "name",
          value: "",
          options: []
        }
      }
    }
  }
module.exports = constructorSSML;