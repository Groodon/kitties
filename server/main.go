package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func returnCats(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	// Open the file
	jsonFile, err := os.Open("catdata.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	// Write the data into the http response writer
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)
	json.NewEncoder(w).Encode(result["cats"])
}

func handleRequests() {
	http.HandleFunc("/cats", returnCats)
	log.Fatal(http.ListenAndServe(":10000", nil))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	handleRequests()
}
