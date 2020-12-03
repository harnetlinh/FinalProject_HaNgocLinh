const constructorSSML = {
    id : 0,
 
    say_as : {
      isDouble : 1,
      tag : "say-as",
      class : "say_as",
      attributes : {
        interpret_as : {
          text : "interpret-as",
          value: "",
          options: ["date","time","literal","telephone","currency","cardinal","ordinal","digits"]
        },
        format : {
          text : "format",
          value: "",
          options: []
        },
      },
    },
    emphasis : {
      isDouble : 1,
      tag : "emphasis",
      class : "emphasis",
      attributes : {
        level: {
          text: "level",
          value: "",
          options: ["strong","moderate","none","reduced"]
        }
      }
    },
    prosody :  {
      isDouble : 1,
      tag : "prosody",
      class : "prosody",
      attributes : {
        pitch : {
          text: "pitch",
          value: "",
          options: ["x-high","high","medium","low","x-low","default"]
        },
        contour : {
          text: "contour",
          value: "",
          options: []
        },
        ranger : {
          text: "ranger",
          value: "",
          options: ["x-high","high","medium","low","x-low","default"]
        },
        rate : {
          text: "rate",
          value: "",
          options: ["x-fast","fast","medium","slow","x-slow","default"]
        },
        duration : {
          text: "duration",
          value: "",
          options: []
        },
        volume : {
          text: "volume",
          value: "",
          options: ["slient","x-soft","soft","medium","loud","x-loud","default"]
        }
      },
    },
    break : {
      isDouble : 0,
      innerText : "_",
      class : "break",
      tag : "break",
      attributes : {
        strength : {
          text: "strength",
          value: "",
          options: ["none","x-small","small","medium","large","x-large"]
        },
        time : {
          text: "time",
          value: "",
          options: []
        }
      }
    },
    audio : {
      isDouble : 0,
      innerText: "audio",
      class : "audio",
      tag : "audio",
      attributes : {
        src : {
          text: "src",
          value: "",
          options: []
        }
      }
    },
    desc : {
      isDouble : 1,
      tag : "desc",
      attributes : {}
    },
    mark : {
      isDouble : 1,
      tag : "mark",
      attributes : {
        name : {
          text: "name",
          value: "",
          options: []
        }
      }
    }
  }
module.exports = constructorSSML;